"""Balance field added to payment

Revision ID: 2d96db9f7533
Revises: 93e98c4c90f6
Create Date: 2022-07-19 23:26:25.553679

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2d96db9f7533'
down_revision = '93e98c4c90f6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('unique_user_role', 'user_roles', ['user_id', 'role_id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('unique_user_role', 'user_roles', type_='unique')
    # ### end Alembic commands ###
