CREATE TABLE IF NOT EXISTS public.images
(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    filename VARCHAR(128) NOT NULL,
    tags JSONB DEFAULT '[]' NOT NULL,
    details JSONB DEFAULT '{}' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP WITH TIME ZONE,
    created_by VARCHAR(128) NOT NULL,
    updated_by VARCHAR(128) NOT NULL
);

CREATE INDEX images_tags_gin_idx
    ON public.images
        USING GIN (tags);