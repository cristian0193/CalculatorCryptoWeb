declare module namespace {

    export interface Status {
        timestamp: Date;
        error_code: number;
        error_message?: any;
        elapsed: number;
        credit_count: number;
        notice?: any;
    }

    export interface USD {
        price: number;
        volume_24h: number;
        percent_change_1h: number;
        percent_change_24h: number;
        percent_change_7d: number;
        market_cap: number;
        last_updated: Date;
    }

    export interface Quote {
        USD: USD;
    }

    export interface Datum {
        id: number;
        name: string;
        symbol: string;
        slug: string;
        num_market_pairs: number;
        date_added: Date;
        tags: string[];
        max_supply: number;
        circulating_supply: number;
        total_supply: number;
        platform?: any;
        cmc_rank: number;
        last_updated: Date;
        quote: Quote;
    }

    export interface RootObject {
        status: Status;
        data: Datum[];
    }

}

