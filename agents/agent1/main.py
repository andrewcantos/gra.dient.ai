# main.py
"""
Basic LangGraph investment agent scaffold.
This will be the starting point for your multi-step workflow.
"""
from dataclasses import dataclass, field
from typing import Dict
from langgraph.graph import StateGraph, END
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import Runnable
import os

llm = ChatOpenAI(model="gpt-4o", temperature=0)

# Prompt-driven agents

gather_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a data-gathering agent for investment research."),
    ("human", "Gather all relevant public data for the company: {company}")
])
gather_agent = gather_prompt | llm

research_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a research analyst. Assess the company based on the provided data."),
    ("human", "Company: {company}\nData: {data}")
])
research_agent = research_prompt | llm

review_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a reviewer. Critically review the research summary and provide a verdict."),
    ("human", "Company: {company}\nResearch: {research}")
])
review_agent = review_prompt | llm

@dataclass
class InvestmentState:
    company: str = ""
    data: Dict = field(default_factory=dict)
    research: Dict = field(default_factory=dict)
    review: Dict = field(default_factory=dict)

def gather_data(state: InvestmentState) -> InvestmentState:
    result = gather_agent.invoke({"company": state.company})
    state.data = {"info": result.content}
    return state

def research_agent_fn(state: InvestmentState) -> InvestmentState:
    result = research_agent.invoke({"company": state.company, "data": state.data["info"]})
    state.research = {"summary": result.content}
    return state

def review_agent_fn(state: InvestmentState) -> InvestmentState:
    result = review_agent.invoke({"company": state.company, "research": state.research["summary"]})
    state.review = {"verdict": result.content}
    return state

graph = StateGraph(state_schema=InvestmentState)
graph.add_node("gather_data", gather_data)
graph.add_node("research_agent", research_agent_fn)
graph.add_node("review_agent", review_agent_fn)

graph.add_edge("gather_data", "research_agent")
graph.add_edge("research_agent", "review_agent")
graph.add_edge("review_agent", END)

graph.set_entry_point("gather_data")

if __name__ == "__main__":
    agent = graph.compile()
    result = agent.invoke(InvestmentState(company="OpenAI"))
    print(result)
