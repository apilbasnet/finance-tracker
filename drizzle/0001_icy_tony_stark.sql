CREATE TABLE "journals" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"description" text,
	"account" text NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"debit" integer NOT NULL,
	"credit" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "journals" ADD CONSTRAINT "journals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;