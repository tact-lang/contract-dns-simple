import { toNano } from "ton";
import { ContractSystem } from "@tact-lang/emulator";
import { SimpleDNSContract } from "./output/dns_SimpleDNSContract";

describe("contract", () => {
  it("should deploy correctly", async () => {
    // Create ContractSystem and deploy contract
    let system = await ContractSystem.create();
    let owner = system.treasure("owner");
    let contract = system.open(await SimpleDNSContract.fromInit(owner.address));
    system.name(contract.address, "main");
    await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
    await system.run();

    // Check intitial permissions
    expect(await contract.getPermissions()).toMatchInlineSnapshot(`
      {
        "$$type": "Permissions",
        "canAdd": true,
        "canRemove": true,
        "canReplace": true,
      }
    `);

    // Burn fuses
    await contract.send(owner, { value: toNano(1) }, "burn canAdd");
    await system.run();
    expect(await contract.getPermissions()).toMatchInlineSnapshot(`
      {
        "$$type": "Permissions",
        "canAdd": false,
        "canRemove": true,
        "canReplace": true,
      }
    `);

    await contract.send(owner, { value: toNano(1) }, "burn canRemove");
    await system.run();
    expect(await contract.getPermissions()).toMatchInlineSnapshot(`
      {
        "$$type": "Permissions",
        "canAdd": false,
        "canRemove": false,
        "canReplace": true,
      }
    `);

    await contract.send(owner, { value: toNano(1) }, "burn canReplace");
    await system.run();
    expect(await contract.getPermissions()).toMatchInlineSnapshot(`
      {
        "$$type": "Permissions",
        "canAdd": false,
        "canRemove": false,
        "canReplace": false,
      }
    `);
  });
});
