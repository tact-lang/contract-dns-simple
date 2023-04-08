import * as fs from 'fs';
import * as path from 'path';
import { Address, contractAddress } from "ton";
import { SimpleDNSContract } from "./output/dns_SimpleDNSContract";
import { prepareTactDeployment } from "@tact-lang/deployer";

(async () => {

    // Parameters
    let testnet = true;
    let packageName = 'sample_SampleTactContract.pkg';
    let owner = Address.parse('kQAp8i3_3zwdIrK7-bx4iDkTD6ep3v1JV4NtCLaVvyq5dHUA');
    let init = await SimpleDNSContract.init(owner);

    // Load required data
    let address = contractAddress(0, init);
    let data = init.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, 'output', packageName));

    // Prepareing
    console.log('Uploading package...');
    let prepare = await prepareTactDeployment({ pkg, data, testnet });

    // Deploying
    console.log("============================================================================================");
    console.log('Contract Address')
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log('Please, follow deployment link')
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();
    console.log("============================================================================================");
})();