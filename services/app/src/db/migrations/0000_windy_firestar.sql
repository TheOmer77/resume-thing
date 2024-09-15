DO $$ BEGIN
 CREATE TYPE "public"."block_content_contact_orientation" AS ENUM('horizontal', 'vertical');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "block" (
	"id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "block_content_contact" (
	"block_id" text PRIMARY KEY NOT NULL,
	"orientation" "block_content_contact_orientation"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "block_content_contact_item" (
	"block_id" text NOT NULL,
	"order" smallint NOT NULL,
	"type" text NOT NULL,
	"text" text NOT NULL,
	"url" text,
	CONSTRAINT "block_content_contact_item_block_id_order_pk" PRIMARY KEY("block_id","order")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "block_content_experience" (
	"block_id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"location" text NOT NULL,
	"start_date" text NOT NULL,
	"end_date" text,
	"text" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "block_content_section" (
	"block_id" text NOT NULL,
	"title" text NOT NULL,
	CONSTRAINT "block_content_section_block_id_unique" UNIQUE("block_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "block_content_section_child" (
	"block_id" text NOT NULL,
	"order" smallint NOT NULL,
	"child_id" text NOT NULL,
	CONSTRAINT "block_content_section_child_block_id_order_pk" PRIMARY KEY("block_id","order"),
	CONSTRAINT "block_content_section_child_block_id_child_id_unique" UNIQUE("block_id","child_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "block_content_text" (
	"block_id" text PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"lead" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "block_content_title" (
	"block_id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"subtitle" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block_content_contact" ADD CONSTRAINT "block_content_contact_block_id_block_id_fk" FOREIGN KEY ("block_id") REFERENCES "public"."block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block_content_contact_item" ADD CONSTRAINT "block_content_contact_item_block_id_block_id_fk" FOREIGN KEY ("block_id") REFERENCES "public"."block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block_content_experience" ADD CONSTRAINT "block_content_experience_block_id_block_id_fk" FOREIGN KEY ("block_id") REFERENCES "public"."block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block_content_section" ADD CONSTRAINT "block_content_section_block_id_block_id_fk" FOREIGN KEY ("block_id") REFERENCES "public"."block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block_content_section_child" ADD CONSTRAINT "block_content_section_child_block_id_block_id_fk" FOREIGN KEY ("block_id") REFERENCES "public"."block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block_content_text" ADD CONSTRAINT "block_content_text_block_id_block_id_fk" FOREIGN KEY ("block_id") REFERENCES "public"."block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block_content_title" ADD CONSTRAINT "block_content_title_block_id_block_id_fk" FOREIGN KEY ("block_id") REFERENCES "public"."block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
