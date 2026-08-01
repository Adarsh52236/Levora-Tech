import asyncio
from app.database.session import SessionLocal
from app.repositories.service import service_repo
from app.repositories.project import project_repo
from app.repositories.testimonial import testimonial_repo
from app.repositories.admin import admin_repo
from app.schemas.service import ServiceCreate
from app.schemas.project import ProjectCreate
from app.schemas.testimonial import TestimonialCreate
from app.schemas.admin import AdminUserCreate
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SERVICES = [
    ServiceCreate(
        title="Website Development",
        slug="website-development",
        short_description="Custom websites built for performance.",
        description="We build fast, responsive, and SEO-optimized websites.",
        icon="Globe",
        display_order=1
    ),
    ServiceCreate(
        title="Web Applications",
        slug="web-applications",
        short_description="Complex web apps using modern frameworks.",
        description="Scalable web applications tailored to your business needs.",
        icon="LayoutGrid",
        display_order=2
    ),
    ServiceCreate(
        title="Mobile Applications",
        slug="mobile-applications",
        short_description="Cross-platform mobile experiences.",
        description="Engaging mobile applications for iOS and Android.",
        icon="Smartphone",
        display_order=3
    ),
    ServiceCreate(
        title="iOS Applications",
        slug="ios-applications",
        short_description="Native iOS applications for Apple ecosystem.",
        description="High-performance native apps for iPhone and iPad.",
        icon="Apple",
        display_order=4
    ),
    ServiceCreate(
        title="UI/UX Engineering",
        slug="ui-ux-engineering",
        short_description="Beautiful and intuitive user interfaces.",
        description="User-centric design that enhances engagement.",
        icon="PenTool",
        display_order=5
    ),
    ServiceCreate(
        title="Custom Software",
        slug="custom-software",
        short_description="Tailored software solutions for enterprise.",
        description="Robust bespoke software that scales with you.",
        icon="Code2",
        display_order=6
    ),
]

PROJECTS = [
    ProjectCreate(
        title="Fintech Dashboard",
        slug="fintech-dashboard",
        description="A comprehensive dashboard for a financial institution.",
        industry="Finance",
        client_name="Global Bank",
        cover_image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
        gallery_images=[],
        technologies=["React", "Node.js", "PostgreSQL"],
        featured=True,
        display_order=1
    ),
    ProjectCreate(
        title="E-Commerce Platform",
        slug="e-commerce-platform",
        description="A high-conversion e-commerce platform.",
        industry="Retail",
        client_name="Retail Co.",
        cover_image="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80",
        gallery_images=[],
        technologies=["Next.js", "Stripe", "Tailwind CSS"],
        featured=False,
        display_order=2
    ),
    ProjectCreate(
        title="Healthcare App",
        slug="healthcare-app",
        description="A mobile app for patient management.",
        industry="Healthcare",
        client_name="HealthPlus",
        cover_image="https://images.unsplash.com/photo-1576091160550-2173ff9e5eb4?auto=format&fit=crop&q=80",
        gallery_images=[],
        technologies=["React Native", "Firebase"],
        featured=False,
        display_order=3
    ),
]

TESTIMONIALS = [
    TestimonialCreate(
        client_name="Sarah Jenkins",
        company="TechStart",
        designation="CTO",
        rating=5,
        message="Levora Tech transformed our vision into reality faster than we thought possible.",
        featured=True
    ),
    TestimonialCreate(
        client_name="Michael Chen",
        company="GrowthCorp",
        designation="CEO",
        rating=5,
        message="Exceptional quality and communication throughout the entire project lifecycle.",
        featured=True
    ),
    TestimonialCreate(
        client_name="Elena Rodriguez",
        company="InnovateEd",
        designation="Product Manager",
        rating=4,
        message="The UI/UX design is flawless. Our users love the new platform.",
        featured=False
    ),
    TestimonialCreate(
        client_name="David Smith",
        company="LogisticsHub",
        designation="Director of Operations",
        rating=5,
        message="They built a custom solution that perfectly fits our complex operational needs.",
        featured=False
    ),
]

ADMIN = AdminUserCreate(
    name="Admin User",
    email="admin@levoratech.com",
    password="supersecretpassword",
    role="admin"
)

async def seed():
    async with SessionLocal() as db:
        print("Seeding Services...")
        for service_data in SERVICES:
            existing = await service_repo.get_by_slug(db, service_data.slug)
            if not existing:
                await service_repo.create(db, service_data)
        
        print("Seeding Projects...")
        for project_data in PROJECTS:
            existing = await project_repo.get_by_slug(db, project_data.slug)
            if not existing:
                await project_repo.create(db, project_data)
                
        print("Seeding Testimonials...")
        # Simplistic check - normally would check by ID or unique combo
        existing_tests = await testimonial_repo.get_all(db, limit=1)
        if not existing_tests:
            for test_data in TESTIMONIALS:
                await testimonial_repo.create(db, test_data)

        print("Seeding Admin User...")
        existing_admin = await admin_repo.get_by_email(db, ADMIN.email)
        if not existing_admin:
            # Hash password before save
            admin_dict = ADMIN.model_dump()
            admin_dict["password_hash"] = pwd_context.hash(admin_dict.pop("password"))
            
            # Using repository create might conflict if schema doesn't match dict exactly, 
            # so we'll instantiate the model manually
            from app.models.admin import AdminUser
            db_admin = AdminUser(**admin_dict)
            db.add(db_admin)
            await db.commit()

        print("Database seeding completed.")

if __name__ == "__main__":
    asyncio.run(seed())
