
-- Create admin users table
CREATE TABLE public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read admin_users (for login verification)
CREATE POLICY "Allow authenticated users to read admin_users" 
    ON public.admin_users 
    FOR SELECT 
    USING (true);

-- Insert the two admin users with hashed passwords
-- Password: @manV#sa6 for both users
INSERT INTO public.admin_users (email, password_hash) VALUES
('manasholidays2011@gmail.com', crypt('@manV#sa6', gen_salt('bf'))),
('sameervaidhraj06@gmail.com', crypt('@manV#sa6', gen_salt('bf')));

-- Create function to update admin password (for future password changes)
CREATE OR REPLACE FUNCTION public.update_admin_password(admin_email TEXT, new_password TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.admin_users 
    SET password_hash = crypt(new_password, gen_salt('bf')),
        updated_at = NOW()
    WHERE email = admin_email;
    
    RETURN FOUND;
END;
$$;

-- Create function to verify admin login
CREATE OR REPLACE FUNCTION public.verify_admin_login(admin_email TEXT, admin_password TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.admin_users 
        WHERE email = admin_email 
        AND password_hash = crypt(admin_password, password_hash)
    );
END;
$$;
