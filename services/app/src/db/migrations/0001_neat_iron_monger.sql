CREATE TABLE IF NOT EXISTS "resume" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"author" text,
	"userId" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "block" ADD COLUMN "resume_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "block" ADD COLUMN "order" smallint;--> statement-breakpoint
ALTER TABLE "block" ADD COLUMN "in_header_row" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "block" ADD COLUMN "in_secondary_col" boolean DEFAULT false NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "block" ADD CONSTRAINT "block_resume_id_resume_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resume"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "block" ADD CONSTRAINT "block_resume_id_order_in_header_row_in_secondary_col_unique" UNIQUE("resume_id","order","in_header_row","in_secondary_col");