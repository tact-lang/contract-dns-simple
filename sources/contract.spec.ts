import { toNano } from "ton";
import { ContractSystem } from "@tact-lang/emulator";
import { SimpleDNSContract } from "./output/dns_SimpleDNSContract";

describe("contract", () => {
  it("should deploy correctly", async () => {
    // Create ContractSystem and deploy contract
    let system = await ContractSystem.create();
    let owner = system.treasure("owner");
    let contract = system.open(await SimpleDNSContract.fromInit(owner.address, 0n));
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
    await contract.send(owner, { value: toNano(1) }, "Burn canAdd");
    await system.run();
    expect(await contract.getPermissions()).toMatchInlineSnapshot(`
      {
        "$$type": "Permissions",
        "canAdd": false,
        "canRemove": true,
        "canReplace": true,
      }
    `);

    await contract.send(owner, { value: toNano(1) }, "Burn canRemove");
    await system.run();
    expect(await contract.getPermissions()).toMatchInlineSnapshot(`
      {
        "$$type": "Permissions",
        "canAdd": false,
        "canRemove": false,
        "canReplace": true,
      }
    `);

    await contract.send(owner, { value: toNano(1) }, "Burn canReplace");
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

  it("should bounce text message", async () => {
    // Create ContractSystem and deploy contract
    let system = await ContractSystem.create();
    let owner = system.treasure("owner");
    let contract = system.open(await SimpleDNSContract.fromInit(owner.address, 0n));
    system.name(contract.address, "main");
    await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
    await system.run();

    let track = system.track(contract);
    await system.provider(contract).internal(owner, { value: toNano(1), body: "Test" });
    await system.run();
    expect(track.collect()).toMatchInlineSnapshot(`
      [
        {
          "$seq": 1,
          "events": [
            {
              "$type": "received",
              "message": {
                "body": {
                  "text": "Test",
                  "type": "text",
                },
                "bounce": true,
                "from": "@treasure(owner)",
                "to": "@main",
                "type": "internal",
                "value": 1000000000n,
              },
            },
            {
              "$type": "failed",
              "errorCode": 130,
              "errorMessage": "Invalid incoming message",
            },
            {
              "$type": "sent-bounced",
              "message": {
                "body": {
                  "cell": "x{FFFFFFFF0000000054657374}",
                  "type": "cell",
                },
                "bounce": false,
                "from": "@main",
                "to": "@treasure(owner)",
                "type": "internal",
                "value": 994120000n,
              },
            },
          ],
        },
      ]
    `);
  });
});
