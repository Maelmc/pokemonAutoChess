import React, { useState } from "react"
import TeamComp from "./team-comp"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"

import ItemStatistic from "./item-statistic"
import { IMeta } from "../../../../../models/mongo-models/meta"
import { IItemsStatistic } from "../../../../../models/mongo-models/items-statistic"
import PokemonStatistic from "./pokemon-statistic"
import { IPokemonsStatistic } from "../../../../../models/mongo-models/pokemons-statistic"
import { t } from "i18next"

const buttonStyle = {
  marginLeft: "10px",
  marginTop: "10px",
  marginRight: "10px"
}

const optStyle = {
  color: "black"
}

const tabStyle = {
  fontSize: "1.2vw"
}

export default function MetaReport(props: {
  meta: IMeta[]
  metaItems: IItemsStatistic[]
  metaPokemons: IPokemonsStatistic[]
  toggleMeta: () => void
}) {
  const [rankingBy, setRanking] = useState<string>("count")
  const [itemRankingBy, setItemRanking] = useState<string>("count")
  const [pokemonRankingBy, setPokemonRanking] = useState<string>("count")

  const meta = props.meta.slice()
  const metaItems = props.metaItems.slice()
  const metaPokemons = props.metaPokemons.slice()

  let sortedMeta = new Array<IMeta>()
  let sortedMetaItems = new Array<IItemsStatistic>()
  let sortedMetaPokemons = new Array<IPokemonsStatistic>()
  if (rankingBy == "count" || rankingBy == "winrate") {
    sortedMeta = meta.sort((a, b) => {
      return b[rankingBy] - a[rankingBy]
    })
  } else {
    sortedMeta = meta.sort((a, b) => {
      return a[rankingBy] - b[rankingBy]
    })
  }
  if (itemRankingBy == "count") {
    sortedMetaItems = metaItems.sort((a, b) => {
      return b[itemRankingBy] - a[itemRankingBy]
    })
  } else {
    sortedMetaItems = metaItems.sort((a, b) => {
      return a[itemRankingBy] - b[itemRankingBy]
    })
  }
  if (pokemonRankingBy == "count") {
    sortedMetaPokemons = metaPokemons.sort((a, b) => {
      return b[pokemonRankingBy] - a[pokemonRankingBy]
    })
  } else {
    sortedMetaPokemons = metaPokemons.sort((a, b) => {
      return a[pokemonRankingBy] - b[pokemonRankingBy]
    })
  }
  return (
    <div>
      <button
        className="bubbly green"
        style={buttonStyle}
        onClick={props.toggleMeta}
      >
        Lobby
      </button>
      <div
        className="nes-container"
        style={{ margin: "10px", height: "90vh", color: "white" }}
      >
        <Tabs>
          <TabList>
            <Tab key="team-comps">{t("meta_report")}</Tab>
            <Tab key="items">{t("item_report")}</Tab>
            <Tab key="pokemons">{t("pokemon_report")}</Tab>
          </TabList>

          <TabPanel key="team-comps-panel">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: "27px",
                paddingLeft: "15px"
              }}
            >
              <h3>{t("best_team_compositions")}</h3>
              <div
                style={{
                  display: "flex",
                  width: "23%",
                  alignItems: "center",
                  justifyContent: "space-around",
                  backgroundColor: "rgb(84, 89, 107)"
                }}
                className="my-select"
              >
                <p style={{ margin: "0px" }}>{t("rank")}</p>
                <select
                  value={rankingBy}
                  onChange={(e) => {
                    setRanking(e.target.value)
                  }}
                  style={{ background: "none", border: "none", color: "white" }}
                >
                  <option style={optStyle} value="count">
                    {t("by_poularity")}
                  </option>
                  <option style={optStyle} value="mean_rank">
                    {t("by_average_place")}
                  </option>
                  <option style={optStyle} value="winrate">
                    {t("by_winrate")}
                  </option>
                </select>
              </div>
            </div>

            <div style={{ height: "70vh", overflowY: "scroll" }}>
              {sortedMeta.map((team) => {
                return <TeamComp team={team} key={team.cluster_id} />
              })}
            </div>
          </TabPanel>
          <TabPanel>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: "27px",
                paddingLeft: "15px"
              }}
            >
              <h3>{t("best_items")}</h3>
              <div
                style={{
                  display: "flex",
                  width: "23%",
                  alignItems: "center",
                  justifyContent: "space-around",
                  backgroundColor: "rgb(84, 89, 107)"
                }}
                className="my-select"
              >
                <p style={{ margin: "0px" }}>{t("rank")}</p>
                <select
                  value={itemRankingBy}
                  onChange={(e) => {
                    setItemRanking(e.target.value)
                  }}
                  style={{ background: "none", border: "none", color: "white" }}
                >
                  <option style={optStyle} value="count">
                    {t("by_popularity")}
                  </option>
                  <option style={optStyle} value="rank">
                    {t("by_average_place")}
                  </option>
                </select>
              </div>
            </div>
            <div style={{ height: "70vh", overflowY: "scroll" }}>
              {sortedMetaItems.map((item) => {
                return <ItemStatistic item={item} key={item.name} />
              })}
            </div>
          </TabPanel>
          <TabPanel>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: "27px",
                paddingLeft: "15px"
              }}
            >
              <h3>{t("best_pokemons")}</h3>
              <div
                style={{
                  display: "flex",
                  width: "23%",
                  alignItems: "center",
                  justifyContent: "space-around",
                  backgroundColor: "rgb(84, 89, 107)"
                }}
                className="my-select"
              >
                <p style={{ margin: "0px" }}>{t("rank")}</p>
                <select
                  value={pokemonRankingBy}
                  onChange={(e) => {
                    setPokemonRanking(e.target.value)
                  }}
                  style={{ background: "none", border: "none", color: "white" }}
                >
                  <option style={optStyle} value="count">
                    {t("by_popularity")}
                  </option>
                  <option style={optStyle} value="rank">
                    {t("by_average_place")}
                  </option>
                </select>
              </div>
            </div>
            <div style={{ height: "70vh", overflowY: "scroll" }}>
              {sortedMetaPokemons.map((pokemon) => {
                return <PokemonStatistic pokemon={pokemon} key={pokemon.name} />
              })}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}
