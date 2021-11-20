import "./styles.css";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from "recoil";

const playerTeam = atom({
  key: "player-team",
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
  return (
    <div className="player-team-container">
      <CharacterIcon
        data={{ name: "Eleanor the Great", currentHp: 12, maxHp: 20 }}
      />
      <CharacterIcon
        data={{ name: "Eleanor the Great", currentHp: 12, maxHp: 20 }}
      />
      <CharacterIcon
        data={{ name: "Eleanor the Great", currentHp: 12, maxHp: 20 }}
      />
    </div>
  );
}
function PlayerTeam(props) {
  const [team, setTeam] = useRecoilState(playerTeam);
  return (
    <div className="player-team-container">
      {team.map((unit) => (
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
        <div className="bold line_2">Ricochet Arrow</div>
        <div>
          Shoot an opponent for 5 damage and do 5 damage to a random enemy.
        </div>
      </div>
    </div>
  );
}

function MoveSelection(props) {
  return (
    <div className="move-selection-container">
      <div>
        <MoveSelectionOption />
        <MoveSelectionOption />
      </div>
      <div>
        <MoveSelectionOption />
        <MoveSelectionOption />
      </div>
    </div>
  );
}

function BattleScene(props) {
  return (
    <div className="battle-scene">
      <EnemyTeam />
      {/* <MoveSelection currentUnit={{ name: "Peter the Sacred" }} /> */}
      <MoveDetails currentUnit={{ name: "Peter the Sacred" }} />
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
