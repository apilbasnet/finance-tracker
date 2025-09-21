ALTER TABLE "journals" ALTER COLUMN "debit" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "journals" ALTER COLUMN "credit" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "journals" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "journals" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;