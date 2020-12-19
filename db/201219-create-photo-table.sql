CREATE TABLE IF NOT EXISTS public.photo
(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    url VARCHAR(128) NOT NULL,
    tags JSONB DEFAULT '[]' NOT NULL,
    details JSONB DEFAULT '{}' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP WITH TIME ZONE,
    created_by VARCHAR(128) NOT NULL,
    updated_by VARCHAR(128) NOT NULL
);

CREATE INDEX photo_tags_gin_idx
    ON public.photo
        USING GIN (tags);