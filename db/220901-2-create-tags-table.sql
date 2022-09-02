CREATE TABLE IF NOT EXISTS public.tags
(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(128) UNIQUE NOT NULL,
    type VARCHAR(128) DEFAULT 'general' NOT NULL,
    images JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP WITH TIME ZONE,
    created_by VARCHAR(128) NOT NULL,
    updated_by VARCHAR(128) NOT NULL
);

CREATE INDEX tags_images_gin_idx
    ON public.tags
        USING GIN (images);