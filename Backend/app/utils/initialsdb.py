from app.utils.config import settings
from sqlalchemy.orm import Session
from app.utils import schemas
from app.repository import roles, admin, user_role, users
from app.utils.userRoles import Role
from app.utils.commonUsers import User
import logging

def databaseinit(db: Session) -> None:
        logging.info("Initializing Database with Roles and Super Admin")
 # Create Role If They Don't Exist
        user_role_in = schemas.Role(
            name=Role.USER["name"], description=Role.USER["description"])
        roles.create(user_role_in, db)

        order_manager = schemas.Role(name=Role.ORDER_MANAGER["name"],description=Role.ORDER_MANAGER["description"])
        roles.create(order_manager, db)
        
        account_manager = schemas.Role(name=Role.ACCOUNT_MANAGER["name"],description=Role.ACCOUNT_MANAGER["description"])
        roles.create(account_manager, db)

        cook_role = schemas.Role(name=Role.COOK["name"],description=Role.COOK["description"])
        roles.create(cook_role, db)
        
        admin_role = schemas.Role(name=Role.ADMIN["name"],description=Role.ADMIN["description"])
        roles.create(admin_role, db)
        
        super_admin_role = schemas.Role(name=Role.SUPER_ADMIN["name"],description=Role.SUPER_ADMIN["description"])
        roles.create(super_admin_role, db)
   
        ## Creating SuperAdmin
        super_admin_ = schemas.User(fullName=User.SUPER_ADMIN["fullName"],email=User.SUPER_ADMIN["email"], password=User.SUPER_ADMIN["password"])
        admin.create(super_admin_, db)
        
    # # Assign super_admin role to user
        role = roles.role_by_name(Role.SUPER_ADMIN["name"], db )
        print(role)
        user =users.get_by_name(User.SUPER_ADMIN["fullName"],db)
        print(user)
        super_admin_role =  schemas.UserRoleBase(user_id = user.id, role_id = role.id)
        user_role.create(super_admin_role, db)
        
        logging.info("Database init Completed")
