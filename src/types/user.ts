// User-related TypeScript types based on backend UserDto

/**
 * Role DTO interface matching backend RoleDTO structure
 */


/**
 * Main User interface based on backend UserDto
 * Matches the Java UserDto class structure
 */
export interface UserDto {
    id?: number;
    name: string;
    email: string;
    phoneNumber?: string;
    profileUrl?: string;
    password?: string; // Write-only field, typically not returned from API
    isActive: boolean;
    address?: string;
    roles?: string[];
    imageFile?: File; // TypeScript equivalent of MultipartFile
}

/**
 * User registration data interface
 * Used when creating new user accounts
 */
export interface UserRegistrationData {
    name: string;
    email: string;
    phoneNumber?: string;
    password: string;
    address?: string;
    imageFile?: File;
    roles?: string[];
}

/**
 * User update data interface
 * Used for updating existing user information (excludes password)
 */
export interface UserUpdateData {
    id: number;
    name?: string;
    email?: string;
    phoneNumber?: string;
    profileUrl?: string;
    address?: string;
    isActive?: boolean;
    imageFile?: File;
}

/**
 * User profile response interface
 * What we typically receive from API (without password)
 */
export interface UserProfile {
    id: number;
    name: string;
    email: string;
    phoneNumber?: string;
    profileUrl?: string;
    active: boolean;
    address?: string;
    roles: string[];
}

/**
 * Login credentials interface
 * Used for authentication requests
 */
export interface LoginCredentials {
    email: string;
    password: string;
}