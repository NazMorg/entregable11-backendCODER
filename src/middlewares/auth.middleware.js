export function checkUserRole(role) {
    return (req, res, next) => {

        const userRole = req.user ? req.user.role : req.session.role;

        if (userRole === role) {
            next();
        } else {
            res.status(403).json({ message: 'Acceso denegado. No tienes permisos suficientes.' });
        }
    };
}