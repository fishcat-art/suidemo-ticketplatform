import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { fromBase64 } from '@mysten/sui/utils';
import { WalrusClient } from '@mysten/walrus';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ========= 基本設定 =========

const rawKey = process.env.WALRUS_PRIVATE_KEY;
if (!rawKey) {
  throw new Error('Missing WALRUS_PRIVATE_KEY in .env');
}

// 1️⃣ Sui client（testnet）
const suiClient = new SuiClient({
  url: 'https://fullnode.testnet.sui.io:443',
});

// 2️⃣ backend signer（Walrus uploader 帳號）
// 去掉 decodedRawKey的第一個Byte (key scheme 0x00)
const decodedRawKey = fromBase64(rawKey);
const PRIVATE_KEY = decodedRawKey.slice(1, 33);

console.log(`PRIVATE_KEY length:`, PRIVATE_KEY.length);

const walrusSigner = Ed25519Keypair.fromSecretKey(PRIVATE_KEY);

console.log(`Backend WALLET:`, walrusSigner.getPublicKey().toSuiAddress());

// 3️⃣ Walrus client（⚠️ 沒有 signer）
const walrus = new WalrusClient({
  network: 'testnet',
  suiClient,
});

// ========= API =========

app.post('/api/upload-metadata', async (req, res) => {
  try {
    const metadata = req.body;

    const bytes = new TextEncoder().encode(
      JSON.stringify(metadata, null, 2),
    );

    const result = await walrus.writeBlob({
      blob: bytes,
      deletable: false,
      epochs: 10,
      signer: walrusSigner, // ✅ signer 在這裡
    });

    const uri = `walrus:${result.blobId}`;
    
    console.log(`✅ Uploaded blob:`, uri);

    res.json({ uri });
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// ========= 啟動 =========

const PORT = 8787;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Walrus backend running on http://localhost:${PORT}`);
});