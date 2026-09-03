from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model


test_case_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are an expert software test engineer.

For every test case provide:

Test Case ID
Test Scenario
Preconditions
Test Steps
Test Data
Expected Result
Priority

Generate the following for this requirement:
1. positive and negative test cases.
2. Test cases for addition or removal of products from the cart.
3. Test cases for the usage of coupon like SAVE20.
4. Boundary-value test cases for the minimum amount for a coupon like 500Rs.
5. Payment-related test cases.
6. Test cases for successful orders.
7. Test cases for failed orders.

Do not invent functionality that is not supported by the requirement.
"""
    ),
    (
        "human",
        """
Requirement:

{requirement}

Requirement Analysis:

{analysis}
"""
    )
])


# Create the LangChain runnable
test_case_chain = test_case_prompt | chat_model