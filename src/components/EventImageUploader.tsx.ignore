import { useState } from 'react';
import { client } from '../services/suiClient';

interface Props {
  onUpload: (blobId: string, imageUrl: string) => void;
}

export default function EventImageUploader({ onUpload }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const uploadEventImage = async (selectedFile: File) => {
    setUploading(true);
    try {
      // Convert file to ArrayBuffer for Walrus
      const arrayBuffer = await selectedFile.arrayBuffer();
      
      // Upload to Walrus (using extended client)
      const blobId = await client.walrus.writeBlob({
        blob: new Uint8Array(arrayBuffer),
        epochs: 100, // Keep available for 100 epochs
      });

      // Generate public URL for the blob
      const imageUrl = `https://testnet.walrus.mystenlabs.com/blob/${blobId}`;
      
      console.log('✅ Uploaded to Walrus:', blobId);
      onUpload(blobId, imageUrl);
    } catch (error) {
      console.error('❌ Walrus upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-6 p-6 bg-white/5 rounded-xl border border-white/20">
      <h3 className="text-lg font-semibold mb-4">Upload Event Image</h3>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            setFile(selectedFile);
            uploadEventImage(selectedFile);
          }
        }}
        disabled={uploading}
        className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
      />
      {uploading && (
        <p className="text-sm text-blue-400 mt-2">Uploading to Walrus...</p>
      )}
      {file && (
        <p className="text-sm text-green-400 mt-2">
          Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
        </p>
      )}
    </div>
  );
}