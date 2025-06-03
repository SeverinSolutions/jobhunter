const Dashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-2">Welcome to JobHunter</h1>
        <p className="text-gray-700 max-w-2xl">
          JobHunter is a personal tool designed to help job seekers stay organized
          throughout their job search. You can use it to track applications, manage
          saved jobs, analyze job listings, and more, all in one place.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Planned Features</h2>
        <ul className="list-disc list-inside text-gray-800 space-y-1">
          <li>📂 Track job applications with status updates</li>
          <li>⭐ Save job listings with notes and tags</li>
          <li>🔍 Scrape listings from job boards (e.g., LinkedIn, Indeed)</li>
          <li>📊 Analyze job trends and personal job search stats</li>
          <li>🧠 Integrate AI to help generate resumes and cover letters</li>
          <li>🔔 Optional alerts for new job matches</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
