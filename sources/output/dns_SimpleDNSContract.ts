import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type DNSResolveResult = {
    $$type: 'DNSResolveResult';
    prefix: bigint;
    record: Cell | null;
}

export function storeDNSResolveResult(src: DNSResolveResult) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.prefix, 257);
        if (src.record !== null && src.record !== undefined) { b_0.storeBit(true).storeRef(src.record); } else { b_0.storeBit(false); }
    };
}

export function loadDNSResolveResult(slice: Slice) {
    let sc_0 = slice;
    let _prefix = sc_0.loadIntBig(257);
    let _record = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'DNSResolveResult' as const, prefix: _prefix, record: _record };
}

function loadTupleDNSResolveResult(source: TupleReader) {
    let _prefix = source.readBigNumber();
    let _record = source.readCellOpt();
    return { $$type: 'DNSResolveResult' as const, prefix: _prefix, record: _record };
}

function storeTupleDNSResolveResult(source: DNSResolveResult) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.prefix);
    builder.writeCell(source.record);
    return builder.build();
}

function dictValueParserDNSResolveResult(): DictionaryValue<DNSResolveResult> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDNSResolveResult(src)).endCell());
        },
        parse: (src) => {
            return loadDNSResolveResult(src.loadRef().beginParse());
        }
    }
}

export type UpdateRecord = {
    $$type: 'UpdateRecord';
    domain: string;
    category: bigint;
    record: Cell | null;
}

export function storeUpdateRecord(src: UpdateRecord) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3532961574, 32);
        b_0.storeStringRefTail(src.domain);
        b_0.storeInt(src.category, 257);
        if (src.record !== null && src.record !== undefined) { b_0.storeBit(true).storeRef(src.record); } else { b_0.storeBit(false); }
    };
}

export function loadUpdateRecord(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3532961574) { throw Error('Invalid prefix'); }
    let _domain = sc_0.loadStringRefTail();
    let _category = sc_0.loadIntBig(257);
    let _record = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'UpdateRecord' as const, domain: _domain, category: _category, record: _record };
}

function loadTupleUpdateRecord(source: TupleReader) {
    let _domain = source.readString();
    let _category = source.readBigNumber();
    let _record = source.readCellOpt();
    return { $$type: 'UpdateRecord' as const, domain: _domain, category: _category, record: _record };
}

function storeTupleUpdateRecord(source: UpdateRecord) {
    let builder = new TupleBuilder();
    builder.writeString(source.domain);
    builder.writeNumber(source.category);
    builder.writeCell(source.record);
    return builder.build();
}

function dictValueParserUpdateRecord(): DictionaryValue<UpdateRecord> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateRecord(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateRecord(src.loadRef().beginParse());
        }
    }
}

export type UpdateSubdomain = {
    $$type: 'UpdateSubdomain';
    domain: string;
    address: Address | null;
}

export function storeUpdateSubdomain(src: UpdateSubdomain) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1547073789, 32);
        b_0.storeStringRefTail(src.domain);
        b_0.storeAddress(src.address);
    };
}

export function loadUpdateSubdomain(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1547073789) { throw Error('Invalid prefix'); }
    let _domain = sc_0.loadStringRefTail();
    let _address = sc_0.loadMaybeAddress();
    return { $$type: 'UpdateSubdomain' as const, domain: _domain, address: _address };
}

function loadTupleUpdateSubdomain(source: TupleReader) {
    let _domain = source.readString();
    let _address = source.readAddressOpt();
    return { $$type: 'UpdateSubdomain' as const, domain: _domain, address: _address };
}

function storeTupleUpdateSubdomain(source: UpdateSubdomain) {
    let builder = new TupleBuilder();
    builder.writeString(source.domain);
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserUpdateSubdomain(): DictionaryValue<UpdateSubdomain> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateSubdomain(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateSubdomain(src.loadRef().beginParse());
        }
    }
}

export type EventPermissionsUpdated = {
    $$type: 'EventPermissionsUpdated';
    permissions: Permissions;
}

export function storeEventPermissionsUpdated(src: EventPermissionsUpdated) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1825938406, 32);
        b_0.store(storePermissions(src.permissions));
    };
}

export function loadEventPermissionsUpdated(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1825938406) { throw Error('Invalid prefix'); }
    let _permissions = loadPermissions(sc_0);
    return { $$type: 'EventPermissionsUpdated' as const, permissions: _permissions };
}

function loadTupleEventPermissionsUpdated(source: TupleReader) {
    const _permissions = loadTuplePermissions(source.readTuple());
    return { $$type: 'EventPermissionsUpdated' as const, permissions: _permissions };
}

function storeTupleEventPermissionsUpdated(source: EventPermissionsUpdated) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTuplePermissions(source.permissions));
    return builder.build();
}

function dictValueParserEventPermissionsUpdated(): DictionaryValue<EventPermissionsUpdated> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeEventPermissionsUpdated(src)).endCell());
        },
        parse: (src) => {
            return loadEventPermissionsUpdated(src.loadRef().beginParse());
        }
    }
}

export type EventRecordAdded = {
    $$type: 'EventRecordAdded';
    domain: string;
    category: bigint;
    record: Cell;
}

export function storeEventRecordAdded(src: EventRecordAdded) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2786974973, 32);
        b_0.storeStringRefTail(src.domain);
        b_0.storeInt(src.category, 257);
        b_0.storeRef(src.record);
    };
}

export function loadEventRecordAdded(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2786974973) { throw Error('Invalid prefix'); }
    let _domain = sc_0.loadStringRefTail();
    let _category = sc_0.loadIntBig(257);
    let _record = sc_0.loadRef();
    return { $$type: 'EventRecordAdded' as const, domain: _domain, category: _category, record: _record };
}

function loadTupleEventRecordAdded(source: TupleReader) {
    let _domain = source.readString();
    let _category = source.readBigNumber();
    let _record = source.readCell();
    return { $$type: 'EventRecordAdded' as const, domain: _domain, category: _category, record: _record };
}

function storeTupleEventRecordAdded(source: EventRecordAdded) {
    let builder = new TupleBuilder();
    builder.writeString(source.domain);
    builder.writeNumber(source.category);
    builder.writeCell(source.record);
    return builder.build();
}

function dictValueParserEventRecordAdded(): DictionaryValue<EventRecordAdded> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeEventRecordAdded(src)).endCell());
        },
        parse: (src) => {
            return loadEventRecordAdded(src.loadRef().beginParse());
        }
    }
}

export type EventRecordUpdated = {
    $$type: 'EventRecordUpdated';
    domain: string;
    category: bigint;
    oldRecord: Cell;
    newRecord: Cell;
}

export function storeEventRecordUpdated(src: EventRecordUpdated) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4012750979, 32);
        b_0.storeStringRefTail(src.domain);
        b_0.storeInt(src.category, 257);
        b_0.storeRef(src.oldRecord);
        b_0.storeRef(src.newRecord);
    };
}

export function loadEventRecordUpdated(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4012750979) { throw Error('Invalid prefix'); }
    let _domain = sc_0.loadStringRefTail();
    let _category = sc_0.loadIntBig(257);
    let _oldRecord = sc_0.loadRef();
    let _newRecord = sc_0.loadRef();
    return { $$type: 'EventRecordUpdated' as const, domain: _domain, category: _category, oldRecord: _oldRecord, newRecord: _newRecord };
}

function loadTupleEventRecordUpdated(source: TupleReader) {
    let _domain = source.readString();
    let _category = source.readBigNumber();
    let _oldRecord = source.readCell();
    let _newRecord = source.readCell();
    return { $$type: 'EventRecordUpdated' as const, domain: _domain, category: _category, oldRecord: _oldRecord, newRecord: _newRecord };
}

function storeTupleEventRecordUpdated(source: EventRecordUpdated) {
    let builder = new TupleBuilder();
    builder.writeString(source.domain);
    builder.writeNumber(source.category);
    builder.writeCell(source.oldRecord);
    builder.writeCell(source.newRecord);
    return builder.build();
}

function dictValueParserEventRecordUpdated(): DictionaryValue<EventRecordUpdated> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeEventRecordUpdated(src)).endCell());
        },
        parse: (src) => {
            return loadEventRecordUpdated(src.loadRef().beginParse());
        }
    }
}

export type EventRecordRemoved = {
    $$type: 'EventRecordRemoved';
    domain: string;
    category: bigint;
}

export function storeEventRecordRemoved(src: EventRecordRemoved) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4287927537, 32);
        b_0.storeStringRefTail(src.domain);
        b_0.storeInt(src.category, 257);
    };
}

export function loadEventRecordRemoved(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4287927537) { throw Error('Invalid prefix'); }
    let _domain = sc_0.loadStringRefTail();
    let _category = sc_0.loadIntBig(257);
    return { $$type: 'EventRecordRemoved' as const, domain: _domain, category: _category };
}

function loadTupleEventRecordRemoved(source: TupleReader) {
    let _domain = source.readString();
    let _category = source.readBigNumber();
    return { $$type: 'EventRecordRemoved' as const, domain: _domain, category: _category };
}

function storeTupleEventRecordRemoved(source: EventRecordRemoved) {
    let builder = new TupleBuilder();
    builder.writeString(source.domain);
    builder.writeNumber(source.category);
    return builder.build();
}

function dictValueParserEventRecordRemoved(): DictionaryValue<EventRecordRemoved> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeEventRecordRemoved(src)).endCell());
        },
        parse: (src) => {
            return loadEventRecordRemoved(src.loadRef().beginParse());
        }
    }
}

export type EventSubdomainAdded = {
    $$type: 'EventSubdomainAdded';
    domain: string;
    address: Address;
}

export function storeEventSubdomainAdded(src: EventSubdomainAdded) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4279974676, 32);
        b_0.storeStringRefTail(src.domain);
        b_0.storeAddress(src.address);
    };
}

export function loadEventSubdomainAdded(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4279974676) { throw Error('Invalid prefix'); }
    let _domain = sc_0.loadStringRefTail();
    let _address = sc_0.loadAddress();
    return { $$type: 'EventSubdomainAdded' as const, domain: _domain, address: _address };
}

function loadTupleEventSubdomainAdded(source: TupleReader) {
    let _domain = source.readString();
    let _address = source.readAddress();
    return { $$type: 'EventSubdomainAdded' as const, domain: _domain, address: _address };
}

function storeTupleEventSubdomainAdded(source: EventSubdomainAdded) {
    let builder = new TupleBuilder();
    builder.writeString(source.domain);
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserEventSubdomainAdded(): DictionaryValue<EventSubdomainAdded> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeEventSubdomainAdded(src)).endCell());
        },
        parse: (src) => {
            return loadEventSubdomainAdded(src.loadRef().beginParse());
        }
    }
}

export type EventSubdomainRemoved = {
    $$type: 'EventSubdomainRemoved';
    domain: string;
}

export function storeEventSubdomainRemoved(src: EventSubdomainRemoved) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3052516533, 32);
        b_0.storeStringRefTail(src.domain);
    };
}

export function loadEventSubdomainRemoved(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3052516533) { throw Error('Invalid prefix'); }
    let _domain = sc_0.loadStringRefTail();
    return { $$type: 'EventSubdomainRemoved' as const, domain: _domain };
}

function loadTupleEventSubdomainRemoved(source: TupleReader) {
    let _domain = source.readString();
    return { $$type: 'EventSubdomainRemoved' as const, domain: _domain };
}

function storeTupleEventSubdomainRemoved(source: EventSubdomainRemoved) {
    let builder = new TupleBuilder();
    builder.writeString(source.domain);
    return builder.build();
}

function dictValueParserEventSubdomainRemoved(): DictionaryValue<EventSubdomainRemoved> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeEventSubdomainRemoved(src)).endCell());
        },
        parse: (src) => {
            return loadEventSubdomainRemoved(src.loadRef().beginParse());
        }
    }
}

export type DNSRecord = {
    $$type: 'DNSRecord';
    name: string;
    categories: Dictionary<bigint, Cell>;
}

export function storeDNSRecord(src: DNSRecord) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeDict(src.categories, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell());
    };
}

export function loadDNSRecord(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _categories = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), sc_0);
    return { $$type: 'DNSRecord' as const, name: _name, categories: _categories };
}

function loadTupleDNSRecord(source: TupleReader) {
    let _name = source.readString();
    let _categories = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
    return { $$type: 'DNSRecord' as const, name: _name, categories: _categories };
}

function storeTupleDNSRecord(source: DNSRecord) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeCell(source.categories.size > 0 ? beginCell().storeDictDirect(source.categories, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell()).endCell() : null);
    return builder.build();
}

function dictValueParserDNSRecord(): DictionaryValue<DNSRecord> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDNSRecord(src)).endCell());
        },
        parse: (src) => {
            return loadDNSRecord(src.loadRef().beginParse());
        }
    }
}

export type Permissions = {
    $$type: 'Permissions';
    canAdd: boolean;
    canRemove: boolean;
    canReplace: boolean;
}

export function storePermissions(src: Permissions) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.canAdd);
        b_0.storeBit(src.canRemove);
        b_0.storeBit(src.canReplace);
    };
}

export function loadPermissions(slice: Slice) {
    let sc_0 = slice;
    let _canAdd = sc_0.loadBit();
    let _canRemove = sc_0.loadBit();
    let _canReplace = sc_0.loadBit();
    return { $$type: 'Permissions' as const, canAdd: _canAdd, canRemove: _canRemove, canReplace: _canReplace };
}

function loadTuplePermissions(source: TupleReader) {
    let _canAdd = source.readBoolean();
    let _canRemove = source.readBoolean();
    let _canReplace = source.readBoolean();
    return { $$type: 'Permissions' as const, canAdd: _canAdd, canRemove: _canRemove, canReplace: _canReplace };
}

function storeTuplePermissions(source: Permissions) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.canAdd);
    builder.writeBoolean(source.canRemove);
    builder.writeBoolean(source.canReplace);
    return builder.build();
}

function dictValueParserPermissions(): DictionaryValue<Permissions> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePermissions(src)).endCell());
        },
        parse: (src) => {
            return loadPermissions(src.loadRef().beginParse());
        }
    }
}

 type SimpleDNSContract_init_args = {
    $$type: 'SimpleDNSContract_init_args';
    owner: Address;
}

function initSimpleDNSContract_init_args(src: SimpleDNSContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function SimpleDNSContract_init(owner: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSimpleDNSContract_init_args({ $$type: 'SimpleDNSContract_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const SimpleDNSContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    21519: { message: `Can't remove records` },
    22696: { message: `Invalid domain` },
    24161: { message: `Invalid DNS name` },
    26438: { message: `Fuse already burned` },
    43961: { message: `Can't add records` },
    55590: { message: `Can't replace records` },
}

const SimpleDNSContract_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"DNSResolveResult","header":null,"fields":[{"name":"prefix","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"record","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"UpdateRecord","header":3532961574,"fields":[{"name":"domain","type":{"kind":"simple","type":"string","optional":false}},{"name":"category","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"record","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"UpdateSubdomain","header":1547073789,"fields":[{"name":"domain","type":{"kind":"simple","type":"string","optional":false}},{"name":"address","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"EventPermissionsUpdated","header":1825938406,"fields":[{"name":"permissions","type":{"kind":"simple","type":"Permissions","optional":false}}]},
    {"name":"EventRecordAdded","header":2786974973,"fields":[{"name":"domain","type":{"kind":"simple","type":"string","optional":false}},{"name":"category","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"record","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"EventRecordUpdated","header":4012750979,"fields":[{"name":"domain","type":{"kind":"simple","type":"string","optional":false}},{"name":"category","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"oldRecord","type":{"kind":"simple","type":"cell","optional":false}},{"name":"newRecord","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"EventRecordRemoved","header":4287927537,"fields":[{"name":"domain","type":{"kind":"simple","type":"string","optional":false}},{"name":"category","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"EventSubdomainAdded","header":4279974676,"fields":[{"name":"domain","type":{"kind":"simple","type":"string","optional":false}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"EventSubdomainRemoved","header":3052516533,"fields":[{"name":"domain","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"DNSRecord","header":null,"fields":[{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"categories","type":{"kind":"dict","key":"int","value":"cell","valueFormat":"ref"}}]},
    {"name":"Permissions","header":null,"fields":[{"name":"canAdd","type":{"kind":"simple","type":"bool","optional":false}},{"name":"canRemove","type":{"kind":"simple","type":"bool","optional":false}},{"name":"canReplace","type":{"kind":"simple","type":"bool","optional":false}}]},
]

const SimpleDNSContract_getters: ABIGetter[] = [
    {"name":"records","arguments":[],"returnType":{"kind":"dict","key":"int","value":"DNSRecord","valueFormat":"ref"}},
    {"name":"permissions","arguments":[],"returnType":{"kind":"simple","type":"Permissions","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"dnsresolve","arguments":[{"name":"subdomain","type":{"kind":"simple","type":"slice","optional":false}},{"name":"category","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"DNSResolveResult","optional":false}},
]

const SimpleDNSContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateRecord"}},
    {"receiver":"internal","message":{"kind":"text","text":"burn canAdd"}},
    {"receiver":"internal","message":{"kind":"text","text":"burn canRemove"}},
    {"receiver":"internal","message":{"kind":"text","text":"burn canReplace"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
]

export class SimpleDNSContract implements Contract {
    
    static async init(owner: Address) {
        return await SimpleDNSContract_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await SimpleDNSContract_init(owner);
        const address = contractAddress(0, init);
        return new SimpleDNSContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new SimpleDNSContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  SimpleDNSContract_types,
        getters: SimpleDNSContract_getters,
        receivers: SimpleDNSContract_receivers,
        errors: SimpleDNSContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateRecord | 'burn canAdd' | 'burn canRemove' | 'burn canReplace' | Deploy | ChangeOwner) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateRecord') {
            body = beginCell().store(storeUpdateRecord(message)).endCell();
        }
        if (message === 'burn canAdd') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'burn canRemove') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'burn canReplace') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getRecords(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('records', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserDNSRecord(), source.readCellOpt());
        return result;
    }
    
    async getPermissions(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('permissions', builder.build())).stack;
        const result = loadTuplePermissions(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getDnsresolve(provider: ContractProvider, subdomain: Cell, category: bigint) {
        let builder = new TupleBuilder();
        builder.writeSlice(subdomain);
        builder.writeNumber(category);
        let source = (await provider.get('dnsresolve', builder.build())).stack;
        const result = loadTupleDNSResolveResult(source);
        return result;
    }
    
}