from alembic import op
import sqlalchemy as sa

revision = '<timestamp>'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'code_submissions',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('code', sa.String, nullable=False),
        sa.Column('output', sa.String)
    )

def downgrade():
    op.drop_table('code_submissions')
