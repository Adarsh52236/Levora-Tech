import logging
from app.schemas.contact import ContactSubmissionResponse

logger = logging.getLogger(__name__)

class NotificationService:
    async def send_contact_notification(self, submission: ContactSubmissionResponse) -> None:
        """
        Placeholder notification service for email/Slack/webhook integration.
        """
        logger.info(f"[NOTIFICATION PLACEHOLDER] New contact submission from {submission.email} for service '{submission.service}'")

notification_service = NotificationService()
