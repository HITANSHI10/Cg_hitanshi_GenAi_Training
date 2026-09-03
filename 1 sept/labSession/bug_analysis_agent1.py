from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model

bug_analysis_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are an expert QA Lead.

Analyze the reported defect and provide:

1. Defect Summary
2. Expected Behavior
3. Actual Behavior
4. Severity
5. Priority
6. Impact Analysis
7. Root Cause Possibilities
8. Affected Modules
9. Recommended Fix
10. Regression Areas to Validate

Use the requirement to determine expected behavior.
"""
    ),
    (
        "human",
        """
Requirement:

{requirement}

Defect Description:

{bug_description}
"""
    )
])

bug_analysis_chain = bug_analysis_prompt | chat_model