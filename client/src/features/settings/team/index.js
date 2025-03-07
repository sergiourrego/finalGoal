import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const addNewTeamMember = () => {
    dispatch(
      showNotification({ message: "Add New Member clicked", status: 1 })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => addNewTeamMember()}
      >
        Invite New
      </button>
    </div>
  );
};

const TEAM_MEMBERS = [
  {
    name: "TrueSt@r",
    avatar:
      "https://camo.githubusercontent.com/e54b230d033920ef460bec600a6fb74dfcfb4794ef701a9cdc62bbed49880eb5/68747470733a2f2f696d672e6672656570696b2e636f6d2f667265652d766563746f722f667269656e646c792d726f626f742d666c6f6174696e672d73706163655f313330382d3136313933342e6a70673f67613d4741312e312e313933313431393539332e313732303331343837352673656d743d6169735f75736572",
    email: "truestar@gmail.com",
    role: "Admin",
    bio: "AI Engineer",
    lastActive: "2 days ago",
  },
  {
    name: "Shine",
    avatar: "https://avatars.githubusercontent.com/u/135434950",
    email: "shine@gmail.com",
    role: "Manager",
    bio: "BlockChain",
    lastActive: "2 days ago",
  },
  {
    name: "Yonex",
    avatar: "https://avatars.githubusercontent.com/u/172279973",
    email: "yandex@gmail.com",
    role: "Owner",
    bio: "FullStack",
    lastActive: "20 hr ago",
  },
  {
    name: "Luckystar",
    avatar:
      "https://camo.githubusercontent.com/e54b230d033920ef460bec600a6fb74dfcfb4794ef701a9cdc62bbed49880eb5/68747470733a2f2f696d672e6672656570696b2e636f6d2f667265652d766563746f722f667269656e646c792d726f626f742d666c6f6174696e672d73706163655f313330382d3136313933342e6a70673f67613d4741312e312e313933313431393539332e313732303331343837352673656d743d6169735f75736572",
    email: "luckystar@gmail.com",
    role: "Support",
    bio: "FrontEnd",
    lastActive: "1 hr ago",
  },
  {
    name: "Luis",
    avatar:
      "https://camo.githubusercontent.com/e54b230d033920ef460bec600a6fb74dfcfb4794ef701a9cdc62bbed49880eb5/68747470733a2f2f696d672e6672656570696b2e636f6d2f667265652d766563746f722f667269656e646c792d726f626f742d666c6f6174696e672d73706163655f313330382d3136313933342e6a70673f67613d4741312e312e313933313431393539332e313732303331343837352673656d743d6169735f75736572",
    email: "luckystar@gmail.com",
    role: "User",
    bio: "FrontEnd",
    lastActive: "1 hr ago",
  },
];

function Team() {
  const [members, setMembers] = useState(TEAM_MEMBERS);

  useEffect(() => {
    (async () => {
      fetch("https://api.github.com/orgs/Finalgoal231/members")
        .then((response) => response.json())
        .then((data) => setMembers(data))
        .catch((error) => console.error("Error:", error));
    })();
  }, []);

  const getRoleComponent = (role) => {
    if (role === "Owner")
      return <div className="badge w-24 badge-secondary">{role}</div>;
    if (role === "Admin")
      return <div className="badge w-24 badge-primary">{role}</div>;
    if (role === "Manager") return <div className="badge w-24">{role}</div>;
    if (role === "Support")
      return <div className="badge w-24 badge-accent">{role}</div>;
    else return <div className="badge w-24 badge-ghost">{role}</div>;
  };

  return (
    <>
      <TitleCard
        title="Active Members"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email Id</th>
                <th>Bio</th>
                <th>Role</th>
                <th>Last Active</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {members.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>{k + 1}</td>
                    <td>
                      <a href={l.html_url} target="_blank" rel="noreferrer">
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-circle w-12 h-12">
                              <img src={l.avatar_url} alt="Avatar" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{l.name || l.login}</div>
                          </div>
                        </div>
                      </a>
                    </td>
                    <td>{l.email}</td>
                    <td>{l.bio}</td>
                    <td>{getRoleComponent(l.role)}</td>
                    <td>{moment(l.updated_at).format("D MMM YYYY")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Team;
