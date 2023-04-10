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

export type EventSubdomainUpdated = {
    $$type: 'EventSubdomainUpdated';
    domain: string;
    oldAddress: Address;
    newAddress: Address;
}

export function storeEventSubdomainUpdated(src: EventSubdomainUpdated) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2877063357, 32);
        b_0.storeStringRefTail(src.domain);
        b_0.storeAddress(src.oldAddress);
        b_0.storeAddress(src.newAddress);
    };
}

export function loadEventSubdomainUpdated(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2877063357) { throw Error('Invalid prefix'); }
    let _domain = sc_0.loadStringRefTail();
    let _oldAddress = sc_0.loadAddress();
    let _newAddress = sc_0.loadAddress();
    return { $$type: 'EventSubdomainUpdated' as const, domain: _domain, oldAddress: _oldAddress, newAddress: _newAddress };
}

function loadTupleEventSubdomainUpdated(source: TupleReader) {
    let _domain = source.readString();
    let _oldAddress = source.readAddress();
    let _newAddress = source.readAddress();
    return { $$type: 'EventSubdomainUpdated' as const, domain: _domain, oldAddress: _oldAddress, newAddress: _newAddress };
}

function storeTupleEventSubdomainUpdated(source: EventSubdomainUpdated) {
    let builder = new TupleBuilder();
    builder.writeString(source.domain);
    builder.writeAddress(source.oldAddress);
    builder.writeAddress(source.newAddress);
    return builder.build();
}

function dictValueParserEventSubdomainUpdated(): DictionaryValue<EventSubdomainUpdated> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeEventSubdomainUpdated(src)).endCell());
        },
        parse: (src) => {
            return loadEventSubdomainUpdated(src.loadRef().beginParse());
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
        b_0.storeDict(src.categories, Dictionary.Keys.BigUint(256), Dictionary.Values.Cell());
    };
}

export function loadDNSRecord(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _categories = Dictionary.load(Dictionary.Keys.BigUint(256), Dictionary.Values.Cell(), sc_0);
    return { $$type: 'DNSRecord' as const, name: _name, categories: _categories };
}

function loadTupleDNSRecord(source: TupleReader) {
    let _name = source.readString();
    let _categories = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.Cell(), source.readCellOpt());
    return { $$type: 'DNSRecord' as const, name: _name, categories: _categories };
}

function storeTupleDNSRecord(source: DNSRecord) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeCell(source.categories.size > 0 ? beginCell().storeDictDirect(source.categories, Dictionary.Keys.BigUint(256), Dictionary.Values.Cell()).endCell() : null);
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
    seed: bigint;
}

function initSimpleDNSContract_init_args(src: SimpleDNSContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.seed, 257);
    };
}

async function SimpleDNSContract_init(owner: Address, seed: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSimpleDNSContract_init_args({ $$type: 'SimpleDNSContract_init_args', owner, seed })(builder);
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
    25569: { message: `Can't destroy contract` },
    26438: { message: `Fuse already burned` },
    43961: { message: `Can't add records` },
    55590: { message: `Can't replace records` },
}

export class SimpleDNSContract implements Contract {
    
    static async init(owner: Address, seed: bigint) {
        return await SimpleDNSContract_init(owner, seed);
    }
    
    static async fromInit(owner: Address, seed: bigint) {
        const init = await SimpleDNSContract_init(owner, seed);
        const address = contractAddress(0, init);
        return new SimpleDNSContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new SimpleDNSContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: SimpleDNSContract_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: UpdateSubdomain | UpdateRecord | 'Destroy' | 'Burn canAdd' | 'Burn canRemove' | 'Burn canReplace' | Deploy | FactoryDeploy | ChangeOwner) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateSubdomain') {
            body = beginCell().store(storeUpdateSubdomain(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateRecord') {
            body = beginCell().store(storeUpdateRecord(message)).endCell();
        }
        if (message === 'Destroy') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Burn canAdd') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Burn canRemove') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Burn canReplace') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'FactoryDeploy') {
            body = beginCell().store(storeFactoryDeploy(message)).endCell();
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
        let result = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), dictValueParserDNSRecord(), source.readCellOpt());
        return result;
    }
    
    async getSubdomains(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('subdomains', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), Dictionary.Values.Address(), source.readCellOpt());
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