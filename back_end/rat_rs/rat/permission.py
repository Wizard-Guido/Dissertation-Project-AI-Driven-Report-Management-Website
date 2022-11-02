from rest_framework import permissions

#
class IsRegisterOrAuthenticated(permissions.BasePermission):
    """
    The request is authenticated as a user, or is a read-only request.
    """
    def has_permission(self, request, view):
        if request.method == 'POST' or (request.user and request.user.is_authenticated):
            return True
        return False