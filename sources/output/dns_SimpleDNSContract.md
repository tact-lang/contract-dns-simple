# TACT Compilation Report
Contract: SimpleDNSContract
BOC Size: 3610 bytes

# Types
Total Types: 20

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## DNSResolveResult
TLB: `_ prefix:int257 record:Maybe ^cell = DNSResolveResult`
Signature: `DNSResolveResult{prefix:int257,record:Maybe ^cell}`

## UpdateRecord
TLB: `update_record#d294b726 domain:^string category:int257 record:Maybe ^cell = UpdateRecord`
Signature: `UpdateRecord{domain:^string,category:int257,record:Maybe ^cell}`

## UpdateSubdomain
TLB: `update_subdomain#5c3678fd domain:^string address:Maybe address = UpdateSubdomain`
Signature: `UpdateSubdomain{domain:^string,address:Maybe address}`

## EventPermissionsUpdated
TLB: `event_permissions_updated#6cd59be6 permissions:Permissions{canAdd:bool,canRemove:bool,canReplace:bool} = EventPermissionsUpdated`
Signature: `EventPermissionsUpdated{permissions:Permissions{canAdd:bool,canRemove:bool,canReplace:bool}}`

## EventRecordAdded
TLB: `event_record_added#a61ddcfd domain:^string category:int257 record:^cell = EventRecordAdded`
Signature: `EventRecordAdded{domain:^string,category:int257,record:^cell}`

## EventRecordUpdated
TLB: `event_record_updated#ef2db883 domain:^string category:int257 oldRecord:^cell newRecord:^cell = EventRecordUpdated`
Signature: `EventRecordUpdated{domain:^string,category:int257,oldRecord:^cell,newRecord:^cell}`

## EventRecordRemoved
TLB: `event_record_removed#ff9494f1 domain:^string category:int257 = EventRecordRemoved`
Signature: `EventRecordRemoved{domain:^string,category:int257}`

## EventSubdomainAdded
TLB: `event_subdomain_added#ff1b3b14 domain:^string address:address = EventSubdomainAdded`
Signature: `EventSubdomainAdded{domain:^string,address:address}`

## EventSubdomainRemoved
TLB: `event_subdomain_removed#b5f1b4b5 domain:^string = EventSubdomainRemoved`
Signature: `EventSubdomainRemoved{domain:^string}`

## EventSubdomainUpdated
TLB: `event_subdomain_updated#ab7c80bd domain:^string oldAddress:address newAddress:address = EventSubdomainUpdated`
Signature: `EventSubdomainUpdated{domain:^string,oldAddress:address,newAddress:address}`

## DNSRecord
TLB: `_ name:^string categories:dict<uint256, ^cell> = DNSRecord`
Signature: `DNSRecord{name:^string,categories:dict<uint256, ^cell>}`

## Permissions
TLB: `_ canAdd:bool canRemove:bool canReplace:bool = Permissions`
Signature: `Permissions{canAdd:bool,canRemove:bool,canReplace:bool}`

# Get Methods
Total Get Methods: 5

## records

## subdomains

## permissions

## owner

## dnsresolve
Argument: subdomain
Argument: category

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
21519: Can't remove records
22696: Invalid domain
24161: Invalid DNS name
25569: Can't destroy contract
26438: Fuse already burned
43961: Can't add records
55590: Can't replace records