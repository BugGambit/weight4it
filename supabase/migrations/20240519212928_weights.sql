CREATE TABLE IF NOT EXISTS weights (
    user_id uuid DEFAULT auth.uid() NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE,
    weight_in_kg integer NOT NULL,
    PRIMARY KEY(user_id, created_at),
    CONSTRAINT "weights_weight_in_kg_check" CHECK ((weight_in_kg > 0))
);

ALTER TABLE ONLY weights
    ADD CONSTRAINT "weights_user_id_created_at_key" UNIQUE (user_id, created_at);

ALTER TABLE ONLY weights
    ADD CONSTRAINT "weights_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE weights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User can see their own weights only." ON weights FOR SELECT USING ((( SELECT auth.uid() AS "uid") = "user_id"));
CREATE POLICY "Users can upload their own weight." ON weights FOR INSERT TO "authenticated" WITH CHECK ((( SELECT auth.uid() AS "uid") = "user_id"));
