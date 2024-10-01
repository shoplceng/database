import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null); // Add role state

    useEffect(() => {
        // Check localStorage or sessionStorage for authentication status
        const authStatus = localStorage.getItem('isAuthenticated') === 'true';
        setIsAuthenticated(authStatus);
        const roleStatus = localStorage.getItem('role'); 
        setRole(roleStatus);
    }, []);

    const login = (userRole) => {
        console.log(`this is the userRole: ${userRole}`);
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true'); // Save to localStorage
        setRole(userRole); // Set the role when logging in
        localStorage.setItem('role', userRole)
        console.log(`user role is set to: ${role}`);
        const newRole = userRole;
        return newRole
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated'); // Remove from localStorage
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// export const RoleCheck = () => {
//     const [roleCall, setRoleCall] = useState('');

//     useEffect(() => {
//         const roleStatus = localStorage.getItem('roleCall') === 'engineer';
//         setRoleCall(roleStatus);
//     })

//     return roleCall;
// }

// Custom hook to use authentication
export const useAuth = () => useContext(AuthContext);
