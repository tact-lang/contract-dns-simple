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

struct DNSRecord { name: String; categories: map<Int, Cell>; }
struct Permissions { canAdd: Bool; canRemove: Bool; canReplace: Bool; }

contract SimpleDNSContract with Deployable, OwnableTransferable, DNSResolver {

    owner: Address;
    permissions: Permissions;
    records: map<Int, DNSRecord>;
    subdomains: map<Int, Address>;

    init(owner: Address) {
        self.owner = owner;
        self.records = emptyMap();
        self.permissions = Permissions { canAdd: true, canRemove: true, canReplace: true };
    }

    receive(update: UpdateRecord) {
        nativeReserve(ton("1"), 0);
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
                reply("Record removed".asComment());
                return;
            }

            // Replace record
            if (cat != null && update.record != null) {
                    
                // Check
                require(self.permissions.canReplace, "Can't replace records");
    
                // Replace category
                domain.categories.set(update.category, update.record);
                self.records.set(id, domain);
    
                // Reply
                reply("Record replaced".asComment());
                return;
            }

            // Add new one
            if (cat == null && update.record != null) {
                
                // Check
                require(self.permissions.canAdd, "Can't add records");
    
                // Replace category
                domain.categories.set(update.category, update.record);
                self.records.set(id, domain);
    
                // Reply
                reply("Record added".asComment());
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
    
                // Reply
                reply("Record added".asComment());
                return;
            }
        }

        // Fallback
        reply("Record not found".asComment());
    }

    receive("burn canAdd") {
        self.requireOwner();
        require(self.permissions.canAdd, "Fuse already burned");
        self.permissions.canAdd = false;
        reply("Fuse burned".asComment());
    }

    receive("burn canRemove") {
        self.requireOwner();
        require(self.permissions.canRemove, "Fuse already burned");
        self.permissions.canRemove = false;
        reply("Fuse burned".asComment());
    }

    receive("burn canReplace") {
        self.requireOwner();
        require(self.permissions.canReplace, "Fuse already burned");
        self.permissions.canReplace = false;
        reply("Fuse burned".asComment());
    }

    //
    // Resolver
    //

    overrides fun doResolveDNS(subdomain: Slice, category: Int): DNSResolveResult {
        
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
        return DNSResolveResult { prefix: totalBits, record: null };
    }

    //
    // Getters
    //

    get fun records(): map<Int, DNSRecord> {
        return self.records;
    }

    get fun permissions(): Permissions {
        return self.permissions;
    }
}