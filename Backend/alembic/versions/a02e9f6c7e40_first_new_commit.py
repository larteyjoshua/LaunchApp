"""First New Commit

Revision ID: a02e9f6c7e40
Revises: 
Create Date: 2022-03-22 00:48:01.625763

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a02e9f6c7e40'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('company',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('location', sa.String(), nullable=True),
    sa.Column('isActive', sa.Boolean(), nullable=True),
    sa.Column('phoneNumber', sa.String(), nullable=True),
    sa.Column('dateAdded', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_company_email'), 'company', ['email'], unique=True)
    op.create_index(op.f('ix_company_id'), 'company', ['id'], unique=False)
    op.create_table('roles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('dateAdded', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_roles_id'), 'roles', ['id'], unique=False)
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('fullName', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('password', sa.String(), nullable=True),
    sa.Column('dateCreated', sa.DateTime(), nullable=True),
    sa.Column('isActive', sa.Boolean(), nullable=True),
    sa.Column('companyId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['companyId'], ['company.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_table('accounts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('companyId', sa.Integer(), nullable=True),
    sa.Column('totalCost', sa.Float(), nullable=True),
    sa.Column('amountPaid', sa.Float(), nullable=True),
    sa.Column('balance', sa.Float(), nullable=True),
    sa.Column('modifyBy', sa.Integer(), nullable=True),
    sa.Column('dateModified', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['companyId'], ['company.id'], ),
    sa.ForeignKeyConstraint(['modifyBy'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_accounts_id'), 'accounts', ['id'], unique=False)
    op.create_table('association',
    sa.Column('company_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['company_id'], ['company.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('company_id', 'user_id')
    )
    op.create_table('foods',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('ingredients', sa.String(), nullable=True),
    sa.Column('dateAdded', sa.DateTime(), nullable=True),
    sa.Column('price', sa.Float(), nullable=True),
    sa.Column('addedBy', sa.Integer(), nullable=True),
    sa.Column('imagePath', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['addedBy'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_foods_id'), 'foods', ['id'], unique=False)
    op.create_table('riders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('motorNumber', sa.String(), nullable=True),
    sa.Column('tellNumber', sa.String(), nullable=True),
    sa.Column('dateAdded', sa.DateTime(), nullable=True),
    sa.Column('addedBy', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['addedBy'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_riders_email'), 'riders', ['email'], unique=True)
    op.create_index(op.f('ix_riders_id'), 'riders', ['id'], unique=False)
    op.create_table('user_roles',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('role_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['role_id'], ['roles.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'role_id'),
    sa.UniqueConstraint('user_id', 'role_id', name='unique_user_role')
    )
    op.create_index(op.f('ix_user_roles_role_id'), 'user_roles', ['role_id'], unique=False)
    op.create_index(op.f('ix_user_roles_user_id'), 'user_roles', ['user_id'], unique=False)
    op.create_table('feedbacks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('foodId', sa.Integer(), nullable=True),
    sa.Column('comment', sa.String(), nullable=True),
    sa.Column('stars', sa.Integer(), nullable=True),
    sa.Column('dateCommented', sa.DateTime(), nullable=True),
    sa.Column('commentedBy', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['commentedBy'], ['users.id'], ),
    sa.ForeignKeyConstraint(['foodId'], ['foods.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_feedbacks_id'), 'feedbacks', ['id'], unique=False)
    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('orderDate', sa.DateTime(), nullable=True),
    sa.Column('foodId', sa.Integer(), nullable=True),
    sa.Column('companyId', sa.Integer(), nullable=True),
    sa.Column('cost', sa.Float(), nullable=True),
    sa.Column('totalNumber', sa.Integer(), nullable=True),
    sa.Column('riderId', sa.Integer(), nullable=True),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.Column('destination', sa.String(), nullable=True),
    sa.Column('trackingStage', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['companyId'], ['company.id'], ),
    sa.ForeignKeyConstraint(['foodId'], ['foods.id'], ),
    sa.ForeignKeyConstraint(['riderId'], ['riders.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_orders_id'), 'orders', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_orders_id'), table_name='orders')
    op.drop_table('orders')
    op.drop_index(op.f('ix_feedbacks_id'), table_name='feedbacks')
    op.drop_table('feedbacks')
    op.drop_index(op.f('ix_user_roles_user_id'), table_name='user_roles')
    op.drop_index(op.f('ix_user_roles_role_id'), table_name='user_roles')
    op.drop_table('user_roles')
    op.drop_index(op.f('ix_riders_id'), table_name='riders')
    op.drop_index(op.f('ix_riders_email'), table_name='riders')
    op.drop_table('riders')
    op.drop_index(op.f('ix_foods_id'), table_name='foods')
    op.drop_table('foods')
    op.drop_table('association')
    op.drop_index(op.f('ix_accounts_id'), table_name='accounts')
    op.drop_table('accounts')
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
    op.drop_index(op.f('ix_roles_id'), table_name='roles')
    op.drop_table('roles')
    op.drop_index(op.f('ix_company_id'), table_name='company')
    op.drop_index(op.f('ix_company_email'), table_name='company')
    op.drop_table('company')
    # ### end Alembic commands ###