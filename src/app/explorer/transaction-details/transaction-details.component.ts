import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from "../../bitcoin-types";

type TxTo = {
    value: number;
    addresses: string[];
}

type TxFrom = {
    txid: string;
    vout: number;
}

type Transacted = {
    from: TxFrom[];
    to: TxTo[];
}

@Component({
    selector: 'transaction-details',
    templateUrl: './transaction-details.component.html',
    styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {

    @Input() transaction: Transaction;
    public transacted: Transacted;
    public total: number;
    public isCoinbase: boolean;

    constructor() {
    }

    ngOnInit() {
        this.transacted = this.getTransacted();
        this.total = this.transacted.to.reduce( (acc, curr) => acc + curr.value, 0);
    }

    private getTransacted(): Transacted {

        let txDetails: Transacted = {
            from: this.transaction.vin.map( vin => ({ txid: vin.txid, vout: vin.vout })),
            to: this.transaction.vout.map( vout => ({ value: vout.value, addresses: vout.scriptPubKey.addresses }))
        };

        this.isCoinbase = txDetails.from.length === 0 || !txDetails.from[0].txid;

        return txDetails;
    }

}
