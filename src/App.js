import "./styles.css";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from "recoil";

const MoveSegment = {
  newBuilder: function () {
    return MoveSegment.Builder();
  },
  Builder: class {
    setTarget(team, num) {
      return this;
    }
    setEffect(type, amount) {
      return this;
    }
  }
};

const moves = [
  {
    target: {
      team: "ENEMY",
      num: "1"
    },
    effect: {
      type: "DAMAGE",
      amount: "5"
    }
  }
];

const playerTeam = atom({
  key: "player-team",
  default: [
    {
      name: "Justin the Great",
      health: {
        current: 20,
        max: 24
      },
      moves: [
        {
          name: "Basic Arrow",
          description: "Shoot an opponent for 5 damage."
        },
        {
          name: "Basic Arrow",
          description: "Shoot an opponent for 5 damage."
        },
        {
          name: "Basic Arrow",
          description: "Shoot an opponent for 5 damage."
        },
        {
          name: "Basic Arrow",
          description: "Shoot an opponent for 5 damage."
        }
      ]
    },
    {
      name: "Brutus the Philosophical",
      health: {
        current: 15,
        max: 24
      },
      moves: [
        {
          name: "Basic Arrow",
          description: "Shoot an opponent for 5 damage."
        },
        {
          name: "Basic Arrow",
          description: "Shoot an opponent for 5 damage."
        },
        {
          name: "Basic Arrow",
          description: "Shoot an opponent for 5 damage."
        },
        {
          name: "Basic Arrow",
          description: "Shoot an opponent for 5 damage."
        }
      ]
    },
    {
      name: "Luffy the Solemn",
      health: {
        current: 23,
        max: 24
      },
      moves: [
        {
          name: "Basic Arrow",
          description: "Shoot an opponent for 5 damage."
        },
        {
          name: "Basic Arrow",
          description: "Shoot an opponent for 5 damage."
        },
        {
          name: "Basic Arrow",
          description: "Shoot an opponent for 5 damage."
        },
        {
          name: "Basic Arrow",
          description: "Shoot an opponent for 5 damage."
        }
      ]
    }
  ]
});

const enemyTeam = atom({
  key: "enemy-team",
  default: [
    {
      name: "Eleanor the Great",
      health: {
        current: 21,
        max: 24
      }
    },
    {
      name: "Alexander the Philosophical",
      health: {
        current: 11,
        max: 24
      }
    },
    {
      name: "Sumi the Solemn",
      health: {
        current: 2,
        max: 24
      }
    }
  ]
});

const gamePhase = atom({
  key: "game-phase",
  default: {
    phase: "target-select",
    currentUnit: {
      team: "player",
      unitIndex: 0
    }
  }
});

function LifeBar(props) {
  const currentHealth = (props.current / props.max) * 904;
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0.0 0.0 960.0 56.0"
        fill="none"
        stroke="none"
        strokeLinecap="square"
        strokeMiterlimit="10"
      >
        <clipPath id="p.0">
          <path
            d="m0 0l960.0 0l0 720.0l-960.0 0l0 -720.0z"
            clipRule="nonzero"
          />
        </clipPath>
        <g clipPath="url(#p.0)">
          <path
            fill="#000000"
            d={`m0 0l960 0l0 56l-910 0z`}
            fillRule="evenodd"
          />
          <path
            fill="#55aa55"
            d={`m0 0l${currentHealth + 48} 0l0 48l-${currentHealth} 0z`}
            fillRule="evenodd"
          />
          <path
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
            stroke-width="4.0"
            stroke-linejoin="round"
            stroke-linecap="butt"
            d={`m0 0l${currentHealth + 50} 0l0 50l-${currentHealth} 0z`}
            fill-rule="evenodd"
          />
        </g>
      </svg>
    </>
  );
}
function CharacterIcon(props) {
  return (
    <div class="character-icon-container">
      <div class="character-icon-name">{props.data.name}</div>
      <img
        className="character-icon-img"
        src="https://cdna.artstation.com/p/assets/images/images/021/664/504/large/zefeng-yang-finalc.jpg?1572506734"
      />
      <LifeBar current={props.data.currentHp} max={props.data.maxHp} />
    </div>
  );
}

function EnemyTeam(props) {
  const [teamState, setTeamState] = useRecoilState(enemyTeam);
  return (
    <div className="player-team-container">
      {teamState.map((unit) => (
        <CharacterIcon
          data={{
            name: unit.name,
            currentHp: unit.health.current,
            maxHp: unit.health.max
          }}
        />
      ))}
    </div>
  );
}

function PlayerTeam(props) {
  const [teamState, setTeamState] = useRecoilState(playerTeam);
  return (
    <div className="player-team-container">
      {teamState.map((unit) => (
        <CharacterIcon
          data={{
            name: unit.name,
            currentHp: unit.health.current,
            maxHp: unit.health.max
          }}
        />
      ))}
    </div>
  );
}

function MoveDetails(props) {
  return (
    <div className="current-unit-container">
      <div className="current-unit-name">{props.currentUnit.name}</div>
      <div className="current-unit-move">
        <strong>{props.currentUnit.name}</strong> sends out a boomerang arrow
        and hits <strong>Eleanor the Great</strong> and{" "}
        <strong>Eleanor the Great</strong> for{" "}
        <span className="current-unit-move-damage">10 damage</span>!
      </div>
      <div className="current-unit-target">
        <div>Eleanor the Great</div>
        <div>Eleanor the Great</div>
      </div>
    </div>
  );
}

function MoveSelectionOption(props) {
  return (
    <div className="move-selection-option-container">
      <div className="move-selection-option-inner-container">
        <div className="bold line_2">{props.move.name}</div>
        <div>{props.move.description}</div>
      </div>
    </div>
  );
}

function MoveSelection(props) {
  const [gamePhaseState, setGamePhaseState] = useRecoilState(gamePhase);
  const [playerTeamState, setPlayerTeamState] = useRecoilState(playerTeam);
  const [enemyTeamState, setEnemyTeamState] = useRecoilState(enemyTeam);

  const moves =
    gamePhaseState.currentUnit.team === "player"
      ? playerTeamState[gamePhaseState.currentUnit.unitIndex].moves
      : enemyTeamState[gamePhaseState.currentUnit.unitIndex].moves;

  return (
    <div className="move-selection-container">
      <div>
        <MoveSelectionOption move={moves[0]} />
        <MoveSelectionOption move={moves[1]} />
      </div>
      <div>
        <MoveSelectionOption move={moves[2]} />
        <MoveSelectionOption move={moves[3]} />
      </div>
    </div>
  );
}
function TargetSelection(props) {
  const [teamState, setTeamState] = useRecoilState(playerTeam);
  return (
    <div className="target-selection-container">
      {teamState.map((unit) => (
        <div className="selection-button-container">
          <div className="selection-button bounce-hover-container">
            <div className="selection-button-inner-container">
              <svg
                className="animated bounce"
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
              >
                <g color="#6c081a">
                  <path
                    d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BattleScene(props) {
  const [gamePhaseState, setGamePhaseState] = useRecoilState(gamePhase);

  let gamePhaseContentDOM;
  if (gamePhaseState.phase === "move-select") {
    gamePhaseContentDOM = (
      <MoveSelection currentUnit={{ name: "Peter the Sacred" }} />
    );
  } else if (gamePhaseState.phase === "move-details") {
    gamePhaseContentDOM = (
      <MoveDetails currentUnit={{ name: "Peter the Sacred" }} />
    );
  } else if (gamePhaseState.phase === "target-select") {
    gamePhaseContentDOM = (
      <TargetSelection currentUnit={{ name: "Peter the Sacred" }} />
    );
  }
  return (
    <div className="battle-scene">
      <EnemyTeam />
      {gamePhaseContentDOM}
      <PlayerTeam />
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <BattleScene />
    </div>
  );
}
