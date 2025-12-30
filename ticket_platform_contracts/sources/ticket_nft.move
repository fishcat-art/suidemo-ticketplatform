module ticket_platform_contracts::ticket_nft {

    use sui::object::{Self, UID, ID};
    use sui::tx_context::{Self, TxContext};
    use sui::coin::Coin;
    use sui::sui::SUI;
    use sui::event;
    use sui::transfer;

    /// 收款人（demo）
    const ORGANIZER: address = @0xf10b6cc3e9adc3f2d850bd0f0facacf63b82bdf3bb6877c90aaa7941396773ed; // 換成你自己的 address

    /// 一張票就是一個 NFT
    public struct Ticket has key, store {
        id: UID,
        event_id: vector<u8>,
        metadata_uri: vector<u8>,
        owner: address,
    }

    /// Mint 事件
    public struct TicketMinted has copy, drop {
        ticket_id: ID,
        owner: address,
        event_id: vector<u8>,
    }

    /// 票價（0.001 SUI）
    const TICKET_PRICE: u64 = 1_000_000;

    /// 使用者付款 + mint 票
    public entry fun buy_ticket(
        event_id: vector<u8>,
        metadata_uri: vector<u8>,
        payment: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        // 驗證金額
        let paid = sui::coin::value(&payment);
        assert!(paid >= TICKET_PRICE, 0);

        // ✅ 正確、唯一可用的轉帳方式
        transfer::public_transfer(payment, ORGANIZER);

        let ticket = Ticket {
            id: object::new(ctx),
            event_id,
            metadata_uri,
            owner: tx_context::sender(ctx),
        };

        let ticket_id = object::id(&ticket);

        event::emit(TicketMinted {
            ticket_id,
            owner: tx_context::sender(ctx),
            event_id,
        });

        transfer::transfer(ticket, tx_context::sender(ctx));
    }
}