
let allIssues = [];
const loadAIssue = async () => {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();

    allIssues = data.data;
    document.getElementById('issue-count').innerText = allIssues.length + " " + "Issues";

    displayIssues(allIssues);

}
const showOpen = () => {
    const openIssues = allIssues.filter(issue => issue.status === "open");
    document.getElementById('issue-count').innerText = openIssues.length + " " + "Issues";
    displayIssues(openIssues);
}
const showClosed = () => {
    const closedIssue = allIssues.filter(issue => issue.status === "closed");
    document.getElementById('issue-count').innerText = closedIssue.length + " " + "Issues";

    displayIssues(closedIssue);

}

const displayIssues = (issues) => {
    const issueContainer = document.getElementById("issue-container");
    issueContainer.innerHTML = "";
    issues.forEach(issue => {
        const borderColor = issue.status === 'open' ? "border-[#00A96E]" : "border-[#A855F7]";
        const priorityColor = issue.priority === 'high' ? "bg-red-100 text-red-600" : issue.priority === 'medium' ? "bg-yellow-100 text-yellow-600" : "bg-[#EEEFF2] text-[#9CA3AF]";
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        <div class="border-t-4 bg-white ${borderColor} min-h-[400px] rounded-2xl shadow">
            <div class="space-y-5 p-4">
                <div class="flex justify-between">
                    <img src="assets/Open-Status.png" alt="" srcset="">
                    <div class="badge badge-soft ${priorityColor} ">${issue.priority}</div>
                </div>
                <h2 class="font-bold text-2xl">${issue.title}</h2>
                <p>${issue.description}</p>
                <div class="flex gap-2">
                    <div class="badge badge-soft badge-error border border-error"><i class="fa-solid fa-bug"></i> Bug</div>
                    <div class="badge badge-soft badge-warning border border-warning">help wanted</div>
                </div>

            </div>
            <hr class="text-[#EFEFEF]">
            <div class="p-4">
                <p>${issue.assignee ? issue.assignee : "assignee not found"}</p>
                <p>${issue.updatedAt}</p>
            </div>
        </div>
        `;

        issueContainer.appendChild(cardDiv);
    });
}





loadAIssue();