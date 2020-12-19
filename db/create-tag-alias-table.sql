CREATE TABLE IF NOT EXISTS public.tag
(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(128) DEFAULT '' NOT NULL,
    type VARCHAR(128) DEFAULT 'general' NOT NULL,
    photos JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMP WITH TIME ZONE,
    created_by VARCHAR(128) NOT NULL,
    updated_by VARCHAR(128) NOT NULL
);

CREATE INDEX tag_photos_gin_idx
    ON public.tag
        USING GIN (photos);