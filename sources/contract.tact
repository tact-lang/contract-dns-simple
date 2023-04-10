import "@stdlib/deploy";
import "@stdlib/ownable";
import "@stdlib/dns";

message UpdateRecord { domain: String; category: Int; record: Cell?; }
message UpdateSubdomain { domain: String; address: Address?; }
message EventPermissionsUpdated { permissions: Permissions; }
message EventRecordAdded { domain: String; category: Int; record: Cell; }
message EventRecordUpdated { domain: String; category: Int; oldRecord: Cell; newRecord: Cell; }
message EventRecordRemoved { domain: String; category: Int; }
message EventSubdomainAdded { domain: String; address: Address; }
message EventSubdomainRemoved { domain: String; }
message EventSubdomainUpdated { domain: String; oldAddress: Address; newAddress: Address; }

struct DNSRecord { name: String; categories: map<Int as uint256, Cell>; }
struct Permissions { canAdd: Bool; canRemove: Bool; canReplace: Bool; }

@interface("org.tact-lang.contract.dns.v0")
contract SimpleDNSContract with Deployable, FactoryDeployable, OwnableTransferable, DNSResolver {
    override const storageReserve: Int = ton("0.1");

    owner: Address;
    permissions: Permissions;
    records: map<Int as uint256, DNSRecord>;
    subdomains: map<Int as uint256, Address>;

    init(owner: Address, seed: Int /* Unused */) {
        self.owner = owner;
        self.records = emptyMap();
        self.permissions = Permissions { canAdd: true, canRemove: true, canReplace: true };
    }

    receive(update: UpdateSubdomain) {
        self.requireOwner();

        // Resolve domain id
        let subdomain: Slice? = dnsStringToInternal(update.domain);
        require(subdomain != null, "Invalid domain");
        let topLevelBits: Int = dnsExtractTopDomainLength(subdomain!!);
        require((subdomain!!).bits() == topLevelBits, "Invalid domain");
        let id: Int = (subdomain!!).hash();

        // Check if subdomain is registered
        let next: Address? = self.subdomains.get(id);
        if (next != null && update.address == null) {

            // Check
            require(self.permissions.canRemove, "Can't remove records");

            // Remove subdomain
            self.subdomains.set(id, null);

            // Emit event
            emit(EventSubdomainRemoved{ domain: update.domain }.toCell());

            // Reply
            self.reply("OK".asComment());
            return;            
        }
        if  (next == null && update.address != null) {
                
            // Check
            require(self.permissions.canAdd, "Can't add records");
    
            // Register subdomain
            self.subdomains.set(id, update.address);
    
            // Emit event
            emit(EventSubdomainAdded{ domain: update.domain, address: update.address!! }.toCell());
    
            // Reply
            self.reply("OK".asComment());
            return;
        }
        if  (next != null && update.address != null) {
                
            // Check
            require(self.permissions.canReplace, "Can't add records");
    
            // Register subdomain
            self.subdomains.set(id, update.address);
    
            // Emit event
            emit(EventSubdomainUpdated{ domain: update.domain, oldAddress: next!!, newAddress: update.address!! }.toCell());
    
            // Reply
            self.reply("OK".asComment());
            return;
        }

        // Reply
        throw(134); // Invalid argument error
    }

    receive(update: UpdateRecord) {
        self.requireOwner();

        // Convert
        let subdomain: Slice? = dnsStringToInternal(update.domain);
        require(subdomain != null, "Invalid domain");
        let id: Int = (subdomain!!).hash();

        // Update record
        let c: DNSRecord? = self.records.get(id);
        if (c != null) {
            let domain: DNSRecord = c!!;
            let cat: Cell? = domain.categories.get(update.category);

            // Remove record
            if (cat != null && update.record == null) {

                // Check
                require(self.permissions.canRemove, "Can't remove records");

                // Clear category
                domain.categories.set(update.category, null);
                self.records.set(id, domain);

                // Emit event
                emit(EventRecordRemoved{ domain: update.domain, category: update.category }.toCell());

                // Reply
                self.reply("OK".asComment());
                return;
            }

            // Replace record
            if (cat != null && update.record != null) {
                    
                // Check
                require(self.permissions.canReplace, "Can't replace records");
    
                // Replace category
                domain.categories.set(update.category, update.record);
                self.records.set(id, domain);

                // Emit event
                emit(EventRecordUpdated{ domain: update.domain, category: update.category, oldRecord: cat!!, newRecord: update.record!! }.toCell());
    
                // Reply
                self.reply("OK".asComment());
                return;
            }

            // Add new one
            if (cat == null && update.record != null) {
                
                // Check
                require(self.permissions.canAdd, "Can't add records");
    
                // Replace category
                domain.categories.set(update.category, update.record);
                self.records.set(id, domain);

                // Emit event
                emit(EventRecordAdded{ domain: update.domain, category: update.category, record: update.record!! }.toCell());
    
                // Reply
                self.reply("OK".asComment());
                return;
            }
        } else {
            // Add new one
            if (update.record != null) {
                
                // Check
                require(self.permissions.canAdd, "Can't add records");
    
                // Replace category
                let domain: DNSRecord = DNSRecord { name: update.domain, categories: emptyMap() };
                domain.categories.set(update.category, update.record);
                self.records.set(id, domain);

                // Emit event
                emit(EventRecordAdded{ domain: update.domain, category: update.category, record: update.record!! }.toCell());
    
                // Reply
                self.reply("OK".asComment());
                return;
            }
        }

        throw(134); // Invalid argument error
    }

    receive("Destroy") {
        self.requireOwner();
        require(self.permissions.canRemove, "Can't destroy contract");
        send(SendParameters{
            bounce: false,
            to: sender(),
            value: 0,
            mode: SendRemainingBalance + SendDestroyIfZero, 
            body: "Contract destroyed".asComment()
        });
    }

    receive("Burn canAdd") {
        self.requireOwner();
        require(self.permissions.canAdd, "Fuse already burned");
        self.permissions.canAdd = false;
        emit(EventPermissionsUpdated{ permissions: self.permissions }.toCell());
        self.reply("OK".asComment());
    }

    receive("Burn canRemove") {
        self.requireOwner();
        require(self.permissions.canRemove, "Fuse already burned");
        self.permissions.canRemove = false;
        emit(EventPermissionsUpdated{ permissions: self.permissions }.toCell());
        self.reply("OK".asComment());
    }

    receive("Burn canReplace") {
        self.requireOwner();
        require(self.permissions.canReplace, "Fuse already burned");
        self.permissions.canReplace = false;
        emit(EventPermissionsUpdated{ permissions: self.permissions }.toCell());
        self.reply("OK".asComment());
    }

    //
    // Resolver
    //

    override fun doResolveDNS(subdomain: Slice, category: Int): DNSResolveResult {
        
        // Self-domain resolving
        if (subdomain.bits() == 0) {
            return self.resolveByKey(subdomain.bits(), 0, category);
        }

        // Check if subdomain is registered
        let topLevel: Slice = dnsExtractTopDomain(subdomain);
        let next: Address? = self.subdomains.get(topLevel.hash());
        if (next != null) {
            return DNSResolveResult { prefix: topLevel.bits(), record: dnsResolveNext(next!!) };
        }

        // Resolve subdomain
        return self.resolveByKey(subdomain.bits(), subdomain.hash(), category);
    }
    
    fun resolveByKey(totalBits: Int, id: Int, category: Int): DNSResolveResult {
        let record: DNSRecord? = self.records.get(id);
        if (record == null) {
            return DNSResolveResult { prefix: totalBits, record: null };
        }
        if (category == 0) {
            return DNSResolveResult { prefix: totalBits, record: (record!!).categories.asCell() };
        }
        let cat: Cell? = (record!!).categories.get(category);
        return DNSResolveResult { prefix: totalBits, record: cat };
    }

    //
    // Getters
    //

    get fun records(): map<Int as uint256, DNSRecord> {
        return self.records;
    }

    get fun subdomains(): map<Int as uint256, Address> {
        return self.subdomains;
    }

    get fun permissions(): Permissions {
        return self.permissions;
    }
}

contract SimpleDNSFactory with Deployable {
    override const storageReserve: Int = ton("0.1");
    counter: Int as uint64;

    init() {
        self.counter = 0;
    }

    receive("Deploy") {
        self.counter = self.counter + 1;
        let init: StateInit = initOf SimpleDNSContract(sender(), self.counter);
        let address: Address = contractAddress(init);

        nativeReserve(self.storageReserve, 0);
        send(SendParameters{
            bounce: false,
            to: address,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors,
            code: init.code,
            data: init.data,
            body: FactoryDeploy{ queryId: self.counter, cashback: sender() }.toCell()
        });
    }
}