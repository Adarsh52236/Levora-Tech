import random
from locust import HttpUser, task, between

class LevoraTechLoadTest(HttpUser):
    wait_time = between(1, 3)

    @task(4)
    def get_services(self):
        self.client.get("/api/v1/services", name="GET /api/v1/services")

    @task(4)
    def get_projects(self):
        self.client.get("/api/v1/projects", name="GET /api/v1/projects")

    @task(3)
    def get_testimonials(self):
        self.client.get("/api/v1/testimonials", name="GET /api/v1/testimonials")

    @task(2)
    def check_health(self):
        self.client.get("/health/ready", name="GET /health/ready")

    @task(1)
    def submit_contact_form(self):
        user_id = random.randint(10000, 99999)
        payload = {
            "name": f"Load Tester {user_id}",
            "email": f"tester_{user_id}@example.com",
            "service": "Website Development",
            "message": f"This is an automated load test inquiry #{user_id}."
        }
        self.client.post("/api/v1/contact", json=payload, name="POST /api/v1/contact")
