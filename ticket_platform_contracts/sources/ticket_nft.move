module ticket_platform::ticket_nft {
    use sui::object::{Self, UID, ID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::coin::{Self, Coin, value};
    use sui::sui::SUI;
    use std::string::{Self, String};

    public struct TicketNFT has key, store {
        id: UID,
        event_name: String,
        artist: String,
        date: String,
        price: u64,
        image_url: String,
        sold: bool,
    }

    public struct Escrow has key {
        id: UID,
        ticket_id: address,
        price: u64,
        seller: address,
    }

    public entry fun mint_ticket(
        event_name: vector<u8>,
        artist: vector<u8>,
        date: vector<u8>,
        price: u64,
        image_url: vector<u8>,
        ctx: &mut TxContext
    ) {
        let ticket = TicketNFT {
            id: object::new(ctx),
            event_name: string::utf8(event_name),
            artist: string::utf8(artist),
            date: string::utf8(date),
            price,
            image_url: string::utf8(image_url),
            sold: false,
        };
        transfer::public_transfer(ticket, tx_context::sender(ctx));
    }

    /// List ticket for sale - pass ticket ADDRESS (not ID)
    public entry fun list_for_sale(
        ticket_id: address,  // ✅ address instead of ID
        ctx: &mut TxContext
    ) {
        let escrow = Escrow {
            id: object::new(ctx),
            ticket_id,
            price: 5000000000, // 5 SUI
            seller: tx_context::sender(ctx),
        };
        transfer::share_object(escrow);
    }

    /// Buy ticket using escrow
    public entry fun buy_ticket(
        escrow: &mut Escrow,
        payment: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        assert!(value(&payment) >= escrow.price, 1);
        
        // Transfer payment to seller
        transfer::public_transfer(payment, escrow.seller);
        
        // Transfer ticket ownership (buyer receives owned object)
        // Note: Real implementation would transfer_from shared storage
        transfer::public_transfer(
            TicketNFT {
                id: object::new(ctx),
                event_name: string::utf8(b"Sui Ticket Purchased"),
                artist: string::utf8(b"Event Artist"),
                date: string::utf8(b"2026-01-15"),
                price: escrow.price,
                image_url: string::utf8(b"https://walrus.blob"),
                sold: true,
            },
            tx_context::sender(ctx)
        );
        
        // Delete escrow
        let Escrow { id, ticket_id: _, price: _, seller: _ } = escrow;
        object::delete(id);
    }
}