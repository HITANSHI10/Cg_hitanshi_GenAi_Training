from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model

bug_report_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are an expert QA Engineer.

Create a professional defect report.

Provide:

- Defect ID
- Defect Title
- Module
- Environment
- Preconditions
- Steps to Reproduce
- Test Data
- Expected Result
- Actual Result
- Severity
- Priority
- Status
- Impact
- Attachments Needed
- Comments

Generate a clear defect report suitable for Jira/Azure DevOps.
"""
    ),
    (
        "human",
        """
Requirement:

{requirement}

Defect:

{bug_description}
"""
    )
])

bug_report_chain = bug_report_prompt | chat_model