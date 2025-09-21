ALTER TABLE "journals" ALTER COLUMN "debit" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "journals" ALTER COLUMN "credit" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "journals" ALTER COLUMN "created_at" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "journals" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "journals" ALTER COLUMN "updated_at" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "journals" ALTER COLUMN "updated_at" SET DEFAULT now();