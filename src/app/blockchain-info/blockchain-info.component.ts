import {Component, OnInit} from '@angular/core';
import {RpcService} from "../rpc.service";
import {BlockchainInfo} from "../bitcoin-types";
import * as _ from "underscore";

@Component({
    selector: 'blockchain-info',
    templateUrl: './blockchain-info.component.html',
    styleUrls: ['./blockchain-info.component.scss']
})
export class BlockchainInfoComponent implements OnInit {

    public blockchainInfo: BlockchainInfo;

    // public blockchainInfo = {
    //     "chain": "main",
    //     "blocks": 496904,
    //     "headers": 500506,
    //     "bestblockhash": "000000000000000000ae12d6fef43bcc51d760ea5e6ceaf0d308f637d3cf54ad",
    //     "difficulty": "1347001430558.57",
    //     "mediantime": 1512071459,
    //     "verificationprogress": "0.9796224263791448",
    //     "chainwork": "000000000000000000000000000000000000000000bd05448552be7be179f736",
    //     "pruned": false,
    //     "softforks": [
    //         {
    //             "id": "bip34",
    //             "version": 2,
    //             "reject": {
    //                 "status": true
    //             }
    //         },
    //         {
    //             "id": "bip66",
    //             "version": 3,
    //             "reject": {
    //                 "status": true
    //             }
    //         },
    //         {
    //             "id": "bip65",
    //             "version": 4,
    //             "reject": {
    //                 "status": true
    //             }
    //         }
    //     ],
    //     "bip9_softforks": {
    //         "csv": {
    //             "status": "active",
    //             "startTime": 1462060800,
    //             "timeout": 1493596800,
    //             "since": 419328
    //         },
    //         "segwit": {
    //             "status": "active",
    //             "startTime": 1479168000,
    //             "timeout": 1510704000,
    //             "since": 481824
    //         }
    //     }
    // };

    constructor(private rpcService: RpcService) {
    }

    ngOnInit() {

        this.rpcService.getBlockchainInfo().then(info => {
            this.blockchainInfo = info;
            console.log(this.blockchainInfo.bip9_softforks);
            for (let key in this.blockchainInfo.bip9_softforks) {
                console.log(key);
            }
        });
    }

    public getBip9Keys(): string[] {

        return _.keys(this.blockchainInfo.bip9_softforks);
    }

}
