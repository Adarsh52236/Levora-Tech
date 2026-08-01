"""Initial schema

Revision ID: 1a2b3c4d5e6f
Revises: 
Create Date: 2026-08-01 18:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '1a2b3c4d5e6f'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # AdminUsers
    op.create_table('admin_users',
    sa.Column('id', sa.Uuid(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('password_hash', sa.String(length=255), nullable=False),
    sa.Column('role', sa.String(length=50), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_admin_users_email'), 'admin_users', ['email'], unique=True)

    # ContactSubmissions
    op.create_table('contact_submissions',
    sa.Column('id', sa.Uuid(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('service', sa.String(length=255), nullable=False),
    sa.Column('message', sa.Text(), nullable=False),
    sa.Column('status', sa.Enum('NEW', 'READ', 'IN_PROGRESS', 'CLOSED', name='contact_status_enum'), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_contact_submissions_email'), 'contact_submissions', ['email'], unique=False)
    op.create_index(op.f('ix_contact_submissions_status'), 'contact_submissions', ['status'], unique=False)

    # Projects
    op.create_table('projects',
    sa.Column('id', sa.Uuid(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('slug', sa.String(length=255), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('industry', sa.String(length=100), nullable=False),
    sa.Column('client_name', sa.String(length=255), nullable=False),
    sa.Column('cover_image', sa.String(length=1024), nullable=False),
    sa.Column('gallery_images', postgresql.JSONB(astext_type=sa.Text()), nullable=False),
    sa.Column('technologies', postgresql.JSONB(astext_type=sa.Text()), nullable=False),
    sa.Column('live_url', sa.String(length=1024), nullable=True),
    sa.Column('github_url', sa.String(length=1024), nullable=True),
    sa.Column('featured', sa.Boolean(), nullable=False),
    sa.Column('display_order', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_projects_display_order'), 'projects', ['display_order'], unique=False)
    op.create_index(op.f('ix_projects_featured'), 'projects', ['featured'], unique=False)
    op.create_index(op.f('ix_projects_slug'), 'projects', ['slug'], unique=True)

    # Services
    op.create_table('services',
    sa.Column('id', sa.Uuid(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('slug', sa.String(length=255), nullable=False),
    sa.Column('short_description', sa.String(length=500), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('icon', sa.String(length=100), nullable=False),
    sa.Column('display_order', sa.Integer(), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_services_display_order'), 'services', ['display_order'], unique=False)
    op.create_index(op.f('ix_services_slug'), 'services', ['slug'], unique=True)

    # Testimonials
    op.create_table('testimonials',
    sa.Column('id', sa.Uuid(), nullable=False),
    sa.Column('client_name', sa.String(length=255), nullable=False),
    sa.Column('company', sa.String(length=255), nullable=False),
    sa.Column('designation', sa.String(length=255), nullable=False),
    sa.Column('avatar_url', sa.String(length=1024), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('message', sa.Text(), nullable=False),
    sa.Column('featured', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.CheckConstraint('rating >= 1 AND rating <= 5', name='check_rating_range'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_testimonials_featured'), 'testimonials', ['featured'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_testimonials_featured'), table_name='testimonials')
    op.drop_table('testimonials')
    op.drop_index(op.f('ix_services_slug'), table_name='services')
    op.drop_index(op.f('ix_services_display_order'), table_name='services')
    op.drop_table('services')
    op.drop_index(op.f('ix_projects_slug'), table_name='projects')
    op.drop_index(op.f('ix_projects_featured'), table_name='projects')
    op.drop_index(op.f('ix_projects_display_order'), table_name='projects')
    op.drop_table('projects')
    op.drop_index(op.f('ix_contact_submissions_status'), table_name='contact_submissions')
    op.drop_index(op.f('ix_contact_submissions_email'), table_name='contact_submissions')
    op.drop_table('contact_submissions')
    op.drop_index(op.f('ix_admin_users_email'), table_name='admin_users')
    op.drop_table('admin_users')
    op.execute("DROP TYPE contact_status_enum")
