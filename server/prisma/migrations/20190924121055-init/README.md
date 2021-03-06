# Migration `20190924121055-init`

This migration has been generated by Akshay Kadam at 9/24/2019, 12:10:55 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "lift"."Blog" (
  "id" TEXT NOT NULL   ,
  "published" BOOLEAN NOT NULL DEFAULT false  ,
  "title" TEXT NOT NULL DEFAULT ''  ,
  PRIMARY KEY ("id")
);
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..20190924121055-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,18 @@
+generator photon {
+  provider = "photonjs"
+}
+
+generator nexus_prisma {
+  provider = "nexus-prisma"
+}
+
+datasource db {
+  provider = "sqlite"
+  url      = "file:dev.db"
+}
+
+model Blog {
+  id        String  @default(cuid()) @id
+  published Boolean @default(false)
+  title     String
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20190924121055-init)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20190924121055-init'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
