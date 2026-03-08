// const removeActive = () => {
//     const activeBtn = document.querySelectorAll('.filter-btn');
//     activeBtn.forEach((btn) => btn.classList.remove('filter-btn'))
// }
// removeActive();
let allIssues = [];
const loadAIssue = async () => {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();

    allIssues = data.data;
    displayIssues(allIssues);

}
const showAll = () => {
    document.getElementById('issue-count').innerText = allIssues.length + " " +"Issues";
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
        const cardDiv = document.createElement('div');
        cardDiv.innerHTML = `
        <div class="border-t-4 bg-white ${borderColor} min-h-[400px] rounded-md shadow">
            <div class="space-y-5 p-4">
                <div class="flex justify-between">
                    <img src="assets/Open-Status.png" alt="" srcset="">
                    <div class="badge badge-soft badge-error">${issue.priority}</div>
                </div>
                <h2 class="font-bold text-2xl">${issue.title}</h2>
                <p>${issue.description}</p>
                <div class="flex gap-2">
                    <div class="badge badge-soft badge-error">Bug</div>
                    <div class="badge badge-soft badge-warning">help wanted</div>
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