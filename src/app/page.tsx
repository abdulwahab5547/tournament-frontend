// 'use client'

// import { usePathname } from 'next/navigation'

// import Players from './players/start/page'
// import QR from './players/qr/page'
// import RegistrationForm from './players/regform/page'
// import AvatarSelection from './players/avatarselection/page'
// import TeamRegistered from './players/teamregistered/page'
// import FinalLoading from './players/finalloading/page'

// import Join from './operators/join/page'
// import AllTeams from './operators/allteams/page'
// import SelectedTeam from './operators/selectedteam/[name]/page'
// import PlayerTurn from './operators/playerturn/page'
// import FinalScreen from './operators/finalscreen/page'

// import RegisteredTeams from './managers/registeredteams/page'
// import MonitorTeams from './managers/monitorteams/page'
// import LeaderBoard from './managers/leaderboard/page'
// import Menu from './managers/menu/page'
// import OperatorControl from './managers/operatorcontrol/page'
// import SubmitResult from './managers/submitresult/page'

// import DisplayScore from './display/displayscore/page'
// import TeamScore from './display/teamscore/page'
// import DuringRegistration from './display/duringregistration/page'
// import DuringGame from './display/duringgame/page'
// import IndividualScore from './display/individualscore/page'
// import FinalScore from './display/topteams/page'
// import FinalScoreTwo from './display/topplayers/page'
// import ScanQR from './display/scanqr/page'

export default function Home() {
  // const pathname = usePathname()
  return (
    <div className=''>
      {/* {pathname === '/display-score' && <DisplayScore />} */}

      {/* Playes */}

            {/* <Players/> */}
            {/* <IntroVideo/> */}
            {/* <QR/> */}

            {/* Phone screens below */}

            {/* <RegistrationForm/> */}
            {/* <AvatarSelection /> */}
            {/* <TeamRegistered/> */}
            {/* <FinalLoading/> */}

        {/* Operator */}
            {/* <Join/> */}
            {/* <AllTeams/> */}
            {/* <SelectedTeam/> */}
            {/* <PlayerTurn/> */}
            {/* <FinalScreen/> */}

        {/* Manager */}
            {/* <Menu/> */}
            {/* <RegisteredTeams/> */}
            {/* <MonitorTeams/> */}
            {/* <OperatorControl/> */}
            {/* <LeaderBoard/> */}
            {/* <SubmitResult/> */}

        {/* Main Display */}
            {/* <DisplayScore /> */}
            {/* <DuringRegistration/> */}
            {/* <DuringGame/> */}
            {/* <TeamScore/> */}
            {/* <IndividualScore/> */}
            {/* <FinalScore/> */}
            {/* <FinalScoreTwo/> */}
            {/* <ScanQR/> */}
    </div>
  );
}
