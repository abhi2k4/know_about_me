import { Card, CardContent } from "./ui/card";

const GithubStats = () => {
  const username = "abhi2k4";

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 
      hover:shadow-lg hover:shadow-primary/5 hover:bg-card/80 
      hover:backdrop-blur-md hover:scale-[1.02] hover:-translate-y-1 
      border border-primary/5 group">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-xl font-bold text-left">GitHub Activity</h3>
        <img 
          src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=transparent&hide_border=true&card_width=500`}
          alt="GitHub Streak"
          className="w-full max-w-lg mx-auto"
          loading="lazy"
        />
        {/* <img
          src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&hide_border=true&card_width=500`}
          alt="GitHub Stats"
          className="w-full max-w-lg mx-auto"
          loading="lazy"
        /> */}
      </div>
    </div>
  );
};

export default GithubStats;