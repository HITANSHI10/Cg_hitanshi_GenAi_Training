from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model


requirement_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are a software testing expert.

Analyze the requirement and provide:

1. Understand and review the requirement.
2. List the functional requirements.
3. Identify any missing or unclear requirements.
4. Define the validations that need to be applied.
5. Identify possible edge cases and exception cases.

"""
    ),
    (
        "human",
        """
Requirement:

{requirement}
"""
    )
])

requirement_agent = requirement_prompt | chat_model