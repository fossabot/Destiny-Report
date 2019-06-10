const { parse } = require("url");
const { getProfile } = require("../../src/utils/endpoints");
const getCharacterLoadout = require("../../src/server/getChacterLoadout");

module.exports = async (req, res) => {
  try {
    const { query } = parse(req.url, true);
    const { membershipId, membershipType } = query;
    if (membershipType && membershipType) {
      const profileReponse = await getProfile(membershipId, membershipType, [
        200,
        205
      ]);
      if (profileReponse.data.ErrorCode !== 1) {
        res.end(
          JSON.stringify({
            ErrorCode: profileReponse.data.ErrorCode,
            success: false,
            ErrorStatus: profileReponse.data.ErrorStatus,
            Message: profileReponse.data.Message
          })
        );
        return;
      }
      const equipments = profileReponse.data.Response.characterEquipment.data;
      const characters = profileReponse.data.Response.characters.data;
      const charactersIds = Object.keys(equipments);
      const promisesTobeResolved = [];
      for (let i = 0; i < charactersIds.length; ++i) {
        const promise = getCharacterLoadout(
          membershipId,
          membershipType,
          equipments[charactersIds[i]],
          characters[charactersIds[i]]
        );
        promisesTobeResolved.push(promise);
      }
      const perksAndDefinition = await Promise.all(promisesTobeResolved);
      res.end(
        JSON.stringify({
          success: true,
          data: perksAndDefinition
        })
      );
    } else {
      res.end(
        JSON.stringify({
          success: false,
          ErrorCode: 18,
          ErrorStatus: "MembershipId And(Or) MembershipType Not Found",
          Message: "MembershipId And MembershipType Are Required"
        })
      );
    }
  } catch (err) {
    res.end(
      JSON.stringify({
        success: false,
        ErrorCode: 111993,
        ErrorStatus: err.response.data.ErrorStatus,
        Message: err.response.data.Message
      })
    );
  }
  // const staticData = [
  //   {
  //     characterId: "2305843009310618171",
  //     minutesPlayedTotal: "13446",
  //     light: 673,
  //     race: "Exo",
  //     gender: "Male",
  //     class: "Warlock",
  //     emblem:
  //       "/common/destiny2_content/icons/ff2155598f2b5984aba551b5198c4175.jpg",
  //     items: {
  //       "2": [
  //         {
  //           name: "Hood of the Great Hunt",
  //           icon:
  //             "/common/destiny2_content/icons/b70e19e236a3cfd0fc762be6f2d226d9.jpg",
  //           type: "Helmet",
  //           itemType: 2,
  //           perks: [
  //             {
  //               name: "Restorative Warlock Armor",
  //               icon:
  //                 "/common/destiny2_content/icons/d1e33790ac71743a83859077227d85df.png"
  //             },
  //             {
  //               name: "Arc Damage Resistance",
  //               icon:
  //                 "/common/destiny2_content/icons/aea5816da503edaa9d76e5ae7fc61fd3.png"
  //             },
  //             {
  //               name: "Pulse Rifle Targeting",
  //               icon:
  //                 "/common/destiny2_content/icons/e0cdc9f169e659c6c36472d2fa485608.png"
  //             },
  //             {
  //               name: "Fusion Rifle Reserves",
  //               icon:
  //                 "/common/destiny2_content/icons/8f02bf866767665a2b631ae77df8f5bb.png"
  //             }
  //           ],
  //           level: 668
  //         },
  //         {
  //           name: "Gloves of the Great Hunt",
  //           icon:
  //             "/common/destiny2_content/icons/b08bfd901f9c788446d67ec4607d3e32.jpg",
  //           type: "Gauntlets",
  //           itemType: 2,
  //           perks: [
  //             {
  //               name: "Heavy Warlock Armor",
  //               icon:
  //                 "/common/destiny2_content/icons/5d71201dbdfdee2715c145bada00df9b.png"
  //             },
  //             {
  //               name: "Void Damage Resistance",
  //               icon:
  //                 "/common/destiny2_content/icons/6df20344470cd7b11c6ffbd104c5a361.png"
  //             },
  //             {
  //               name: "Grenade Launcher Loader",
  //               icon:
  //                 "/common/destiny2_content/icons/a75bddbcafab8e265b16e29179348f2c.png"
  //             },
  //             {
  //               name: "Rocket Launcher Scavenger",
  //               icon:
  //                 "/common/destiny2_content/icons/df9fab41a50fa5eef75ed5594d481f35.png"
  //             }
  //           ],
  //           level: 686
  //         },
  //         {
  //           name: "Robes of the Great Hunt",
  //           icon:
  //             "/common/destiny2_content/icons/25e8f12ce9b0af46729f9fffab61354e.jpg",
  //           type: "Chest Armor",
  //           itemType: 2,
  //           perks: [
  //             {
  //               name: "Mobile Warlock Armor",
  //               icon:
  //                 "/common/destiny2_content/icons/e20e67816af1bdc8ce8acc896a4f0d38.png"
  //             },
  //             {
  //               name: "Arc Damage Resistance",
  //               icon:
  //                 "/common/destiny2_content/icons/aea5816da503edaa9d76e5ae7fc61fd3.png"
  //             },
  //             {
  //               name: "Unflinching Fusion Rifle Aim",
  //               icon:
  //                 "/common/destiny2_content/icons/4c13962368f7625894a3c1550e96cc73.png"
  //             },
  //             {
  //               name: "Submachine Gun Reserves",
  //               icon:
  //                 "/common/destiny2_content/icons/91c2515c2707d22ab6de5a9867bec30d.png"
  //             }
  //           ],
  //           level: 681
  //         },
  //         {
  //           name: "Boots of the Great Hunt",
  //           icon:
  //             "/common/destiny2_content/icons/12c245ed68e4e54cc2a32068841af991.jpg",
  //           type: "Leg Armor",
  //           itemType: 2,
  //           perks: [
  //             {
  //               name: "Restorative Warlock Armor",
  //               icon:
  //                 "/common/destiny2_content/icons/d1e33790ac71743a83859077227d85df.png"
  //             },
  //             {
  //               name: "Solar Damage Resistance",
  //               icon:
  //                 "/common/destiny2_content/icons/b7f54ca7aa43b292f0ff3f966b373214.png"
  //             },
  //             {
  //               name: "Perpetuation",
  //               icon:
  //                 "/common/destiny2_content/icons/586020f3623bda588785e2d119f2e3fc.png"
  //             },
  //             {
  //               name: "Pulse Rifle Scavenger",
  //               icon:
  //                 "/common/destiny2_content/icons/10a9e883207dcea3397ca182b1439b62.png"
  //             }
  //           ],
  //           level: 685
  //         },
  //         {
  //           name: "Vigil of Heroes",
  //           icon:
  //             "/common/destiny2_content/icons/4d5531714b009f369d05f6ed62c6b227.jpg",
  //           type: "Warlock Bond",
  //           itemType: 2,
  //           perks: [
  //             {
  //               name: "Solar Damage Resistance",
  //               icon:
  //                 "/common/destiny2_content/icons/b7f54ca7aa43b292f0ff3f966b373214.png"
  //             },
  //             {
  //               name: "Insulation",
  //               icon:
  //                 "/common/destiny2_content/icons/0e5a16f1ffb4ded4f0341f7d380d28fa.png"
  //             },
  //             {
  //               name: "Grenade Launcher Reserves",
  //               icon:
  //                 "/common/destiny2_content/icons/cb4ba57cdb1024d1568a72ed95a74a78.png"
  //             }
  //           ],
  //           level: 681
  //         }
  //       ],
  //       "3": [
  //         {
  //           name: "Ten Paces",
  //           icon:
  //             "/common/destiny2_content/icons/1fdfd3b6e8ea55023232c63422bb44a4.jpg",
  //           type: "Hand Cannon",
  //           itemType: 3,
  //           perks: [
  //             {
  //               name: "Adaptive Frame",
  //               icon:
  //                 "/common/destiny2_content/icons/ad56b0e83d31592d9984cdf2f392452a.png"
  //             },
  //             {
  //               name: "Quickdraw",
  //               icon:
  //                 "/common/destiny2_content/icons/b04cf9a75031115055678b71c3c58443.png"
  //             },
  //             {
  //               name: "Timed Payload",
  //               icon:
  //                 "/common/destiny2_content/icons/4f7e5ea70d72e3b01614a8e8a1b96735.png"
  //             }
  //           ],
  //           level: 689
  //         },
  //         {
  //           name: "Techeun Force",
  //           icon:
  //             "/common/destiny2_content/icons/a134d02024d456f77ac7d7aa706efd5d.jpg",
  //           type: "Fusion Rifle",
  //           itemType: 3,
  //           perks: [
  //             {
  //               name: "Adaptive Frame",
  //               icon:
  //                 "/common/destiny2_content/icons/ad56b0e83d31592d9984cdf2f392452a.png"
  //             },
  //             {
  //               name: "Kill Clip",
  //               icon:
  //                 "/common/destiny2_content/icons/03e17b5e24aa08bebda6bcbd405b8ada.png"
  //             },
  //             {
  //               name: "Rampage",
  //               icon:
  //                 "/common/destiny2_content/icons/e9aa2f479812bfabc8d48effde384737.png"
  //             }
  //           ],
  //           level: 651
  //         },
  //         {
  //           name: "Stryker's Sure-Hand",
  //           icon:
  //             "/common/destiny2_content/icons/7ac678df92126b2fb86d81accc5ef004.jpg",
  //           type: "Sword",
  //           itemType: 3,
  //           perks: [
  //             {
  //               name: "Adaptive Frame",
  //               icon:
  //                 "/common/destiny2_content/icons/ad56b0e83d31592d9984cdf2f392452a.png"
  //             },
  //             {
  //               name: "Heavy Guard",
  //               icon:
  //                 "/common/destiny2_content/icons/4f900a2b6e2b8d14e96e7e8afded72db.png"
  //             },
  //             {
  //               name: "Assassin's Blade",
  //               icon:
  //                 "/common/destiny2_content/icons/e190dc87349887b6f585ede0f2a73356.png"
  //             },
  //             {
  //               name: "En Garde",
  //               icon:
  //                 "/common/destiny2_content/icons/96aac853bf520635d09558f589abeade.png"
  //             }
  //           ],
  //           level: 650
  //         }
  //       ],
  //       "14": [
  //         {
  //           name: "Wish No More",
  //           icon:
  //             "/common/destiny2_content/icons/ecc3e805988dd9947f37c46428e4a12b.jpg",
  //           type: "Emblem",
  //           itemType: 14,
  //           perks: []
  //         }
  //       ],
  //       "16": [
  //         {
  //           name: "Voidwalker",
  //           icon:
  //             "/common/destiny2_content/icons/e2ea0a55f931666f1569704d116982b0.png",
  //           type: "Warlock Subclass",
  //           itemType: 16,
  //           perks: [
  //             {
  //               name: "Landfall",
  //               icon:
  //                 "/common/destiny2_content/icons/41652a0e135077dba6b888d1678bc003.png"
  //             },
  //             {
  //               name: "Landfall",
  //               icon:
  //                 "/common/destiny2_content/icons/41652a0e135077dba6b888d1678bc003.png"
  //             },
  //             {
  //               name: "Nova Bomb",
  //               icon:
  //                 "/common/destiny2_content/icons/6e3bb98ba7d9b3c4049af91b731fd52c.png"
  //             },
  //             {
  //               name: "Entropic Pull",
  //               icon:
  //                 "/common/destiny2_content/icons/472c48aa69331809639fd699f24654a6.png"
  //             },
  //             {
  //               name: "Chaos Accelerant",
  //               icon:
  //                 "/common/destiny2_content/icons/14d128b5d5e50af85092b97134213b2d.png"
  //             },
  //             {
  //               name: "Cataclysm",
  //               icon:
  //                 "/common/destiny2_content/icons/0d910800a79169d6ed5f1612c68a5aa4.png"
  //             }
  //           ]
  //         }
  //       ],
  //       "17": [
  //         {
  //           name: "Clan Banner",
  //           icon:
  //             "/common/destiny2_content/icons/dae1683dc61a7cf657963c68d47316d8.jpg",
  //           type: "Clan Banner",
  //           itemType: 17,
  //           perks: []
  //         }
  //       ],
  //       "21": [
  //         {
  //           name: "A Thousand Wings",
  //           icon:
  //             "/common/destiny2_content/icons/3139365d986ccaaf4e3cea8845d8df72.jpg",
  //           type: "Ship",
  //           itemType: 21,
  //           perks: [
  //             {
  //               name: "Taken Arrival",
  //               icon:
  //                 "/common/destiny2_content/icons/46fa0c2bb8ccc7c30a8913c9e33ac501.png"
  //             }
  //           ]
  //         }
  //       ],
  //       "22": [
  //         {
  //           name: "Dawning Cheer",
  //           icon:
  //             "/common/destiny2_content/icons/b2a0d491a9e1a758ce090f77c39e00f2.jpg",
  //           type: "Vehicle",
  //           itemType: 22,
  //           perks: [
  //             {
  //               name: "Destabilizers",
  //               icon:
  //                 "/common/destiny2_content/icons/e413865a030e3622e204e951f210dd9f.png"
  //             },
  //             {
  //               name: "Faster Summon",
  //               icon:
  //                 "/common/destiny2_content/icons/c1b7d9c21f3d2636679c4d3beb9a0ed4.png"
  //             }
  //           ],
  //           level: 160
  //         }
  //       ],
  //       "24": [
  //         {
  //           name: "Knight's Peace Shell",
  //           icon:
  //             "/common/destiny2_content/icons/3073e06aef67afd389d669e532f1f1f8.jpg",
  //           type: "Ghost Shell",
  //           itemType: 24,
  //           perks: [
  //             {
  //               name: "Guiding Light",
  //               icon:
  //                 "/common/destiny2_content/icons/b2b78d5e55a083fab5c42e5e18a194f1.png"
  //             },
  //             {
  //               name: "Omni-Telemetry",
  //               icon:
  //                 "/common/destiny2_content/icons/6497c7accb94dbd951c2be4d314dcff7.png"
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   },
  //   {
  //     characterId: "2305843009345414869",
  //     minutesPlayedTotal: "48121",
  //     light: 700,
  //     race: "Human",
  //     gender: "Male",
  //     class: "Titan",
  //     emblem:
  //       "/common/destiny2_content/icons/ff2155598f2b5984aba551b5198c4175.jpg",
  //     items: {
  //       "2": [
  //         {
  //           name: "Reverie Dawn Helm",
  //           icon:
  //             "/common/destiny2_content/icons/136d9c2dfeb2e33996b6547e787145d2.jpg",
  //           type: "Helmet",
  //           itemType: 2,
  //           perks: [
  //             {
  //               name: "Mobile Titan Armor",
  //               icon:
  //                 "/common/destiny2_content/icons/cb887230998d14cdb0eef1d3b3e9b8f7.png"
  //             },
  //             {
  //               name: "Arc Damage Resistance",
  //               icon:
  //                 "/common/destiny2_content/icons/aea5816da503edaa9d76e5ae7fc61fd3.png"
  //             },
  //             {
  //               name: "Hands-On",
  //               icon:
  //                 "/common/destiny2_content/icons/464ed42a0cb0e5ece5c4a39ef8d88e17.png"
  //             },
  //             {
  //               name: "Shotgun Reserves",
  //               icon:
  //                 "/common/destiny2_content/icons/52e7a65fcb8a88ce47efa559c01e4621.png"
  //             }
  //           ],
  //           level: 700
  //         },
  //         {
  //           name: "Notorious Reaper Gauntlets",
  //           icon:
  //             "/common/destiny2_content/icons/32970d04bdb23df13329136a6977ee7c.jpg",
  //           type: "Gauntlets",
  //           itemType: 2,
  //           perks: [
  //             {
  //               name: "Reaper +3",
  //               icon:
  //                 "/common/destiny2_content/icons/cc1d90765bb304c4a744b4e9651ede9e.png"
  //             },
  //             {
  //               name: "Restorative Titan Armor",
  //               icon:
  //                 "/common/destiny2_content/icons/a6a822bab0e92b908cb79f40ab123017.png"
  //             },
  //             {
  //               name: "Solar Damage Resistance",
  //               icon:
  //                 "/common/destiny2_content/icons/b7f54ca7aa43b292f0ff3f966b373214.png"
  //             },
  //             {
  //               name: "Hand Cannon Loader",
  //               icon:
  //                 "/common/destiny2_content/icons/ad4729f753c430344d2120ceb9c3e98d.png"
  //             },
  //             {
  //               name: "Shotgun Scavenger",
  //               icon:
  //                 "/common/destiny2_content/icons/723d26cbd888d4ef7da3eca4589af085.png"
  //             }
  //           ],
  //           level: 700
  //         },
  //         {
  //           name: "Reverie Dawn Plate",
  //           icon:
  //             "/common/destiny2_content/icons/4601435c284f8ec1c5799313c7ea1e29.jpg",
  //           type: "Chest Armor",
  //           itemType: 2,
  //           perks: [
  //             {
  //               name: "Mobile Titan Armor",
  //               icon:
  //                 "/common/destiny2_content/icons/cb887230998d14cdb0eef1d3b3e9b8f7.png"
  //             },
  //             {
  //               name: "Taken Barrier",
  //               icon:
  //                 "/common/destiny2_content/icons/969a93db1c64fb082aa76dc15211bcce.png"
  //             },
  //             {
  //               name: "Solar Damage Resistance",
  //               icon:
  //                 "/common/destiny2_content/icons/b7f54ca7aa43b292f0ff3f966b373214.png"
  //             },
  //             {
  //               name: "Unflinching Hand Cannon Aim",
  //               icon:
  //                 "/common/destiny2_content/icons/d4135472fae905121ccfe2e2f7989cd3.png"
  //             },
  //             {
  //               name: "Auto Rifle Reserves",
  //               icon:
  //                 "/common/destiny2_content/icons/25783738edb1848e51282df182dde0ac.png"
  //             }
  //           ],
  //           level: 700
  //         },
  //         {
  //           name: "Vigil of Heroes",
  //           icon:
  //             "/common/destiny2_content/icons/5566c0ef30345bf6cf4921b831c79912.jpg",
  //           type: "Leg Armor",
  //           itemType: 2,
  //           perks: [
  //             {
  //               name: "Mobile Titan Armor",
  //               icon:
  //                 "/common/destiny2_content/icons/cb887230998d14cdb0eef1d3b3e9b8f7.png"
  //             },
  //             {
  //               name: "Solar Damage Resistance",
  //               icon:
  //                 "/common/destiny2_content/icons/b7f54ca7aa43b292f0ff3f966b373214.png"
  //             },
  //             {
  //               name: "Rocket Launcher Dexterity",
  //               icon:
  //                 "/common/destiny2_content/icons/3bdf5a34c9a7a0ad9e4df8f3be864e33.png"
  //             },
  //             {
  //               name: "Auto Rifle Scavenger",
  //               icon:
  //                 "/common/destiny2_content/icons/98277564267705162c0eac005b9d514e.png"
  //             }
  //           ],
  //           level: 700
  //         },
  //         {
  //           name: "Mimetic Savior Bond",
  //           icon:
  //             "/common/destiny2_content/icons/524b7364b880569ea5574cb87cbb63f6.jpg",
  //           type: "Titan Mark",
  //           itemType: 2,
  //           perks: [
  //             {
  //               name: "Void Damage Resistance",
  //               icon:
  //                 "/common/destiny2_content/icons/6df20344470cd7b11c6ffbd104c5a361.png"
  //             },
  //             {
  //               name: "Insulation",
  //               icon:
  //                 "/common/destiny2_content/icons/0e5a16f1ffb4ded4f0341f7d380d28fa.png"
  //             },
  //             {
  //               name: "Pulse Rifle Reserves",
  //               icon:
  //                 "/common/destiny2_content/icons/6f073d0ab827bb3e919930664338a281.png"
  //             }
  //           ],
  //           level: 700
  //         }
  //       ],
  //       "3": [
  //         {
  //           name: "Ten Paces",
  //           icon:
  //             "/common/destiny2_content/icons/1fdfd3b6e8ea55023232c63422bb44a4.jpg",
  //           type: "Hand Cannon",
  //           itemType: 3,
  //           perks: [
  //             {
  //               name: "Adaptive Frame",
  //               icon:
  //                 "/common/destiny2_content/icons/ad56b0e83d31592d9984cdf2f392452a.png"
  //             },
  //             {
  //               name: "Slideshot",
  //               icon:
  //                 "/common/destiny2_content/icons/fa7ba2abcd8effd143e287668d7c865b.png"
  //             },
  //             {
  //               name: "Hip-Fire Grip",
  //               icon:
  //                 "/common/destiny2_content/icons/9f3c3ae1bddbed21af1cc6487338028e.png"
  //             }
  //           ],
  //           level: 700
  //         },
  //         {
  //           name: "IKELOS_SG_v1.0.1",
  //           icon:
  //             "/common/destiny2_content/icons/edfdd807c9d604e80b48ad8fe39c8f36.jpg",
  //           type: "Shotgun",
  //           itemType: 3,
  //           perks: [
  //             {
  //               name: "Rapid-Fire Frame",
  //               icon:
  //                 "/common/destiny2_content/icons/0ab090e93e19da9e841b0f94c5ab7de6.png"
  //             },
  //             {
  //               name: "Trench Barrel",
  //               icon:
  //                 "/common/destiny2_content/icons/09ecf09e4cc4b0e087d8711d817c64b6.png"
  //             },
  //             {
  //               name: "Threat Detector",
  //               icon:
  //                 "/common/destiny2_content/icons/1cc8d4604d29dfe5bdc321b4c2681bfb.png"
  //             }
  //           ],
  //           level: 700
  //         },
  //         {
  //           name: "Edge Transit",
  //           icon:
  //             "/common/destiny2_content/icons/af033801429b0716f305a1aab9bbe669.jpg",
  //           type: "Grenade Launcher",
  //           itemType: 3,
  //           perks: [
  //             {
  //               name: "Adaptive Frame",
  //               icon:
  //                 "/common/destiny2_content/icons/ad56b0e83d31592d9984cdf2f392452a.png"
  //             },
  //             {
  //               name: "Snapshot Sights",
  //               icon:
  //                 "/common/destiny2_content/icons/49df9d90b3f27bd5ec6a9b35f4c10def.png"
  //             },
  //             {
  //               name: "Genesis",
  //               icon:
  //                 "/common/destiny2_content/icons/e52e3441db003abe3aa2b8a2f7fda730.png"
  //             }
  //           ],
  //           level: 700
  //         }
  //       ],
  //       "14": [
  //         {
  //           name: "Wish No More",
  //           icon:
  //             "/common/destiny2_content/icons/ecc3e805988dd9947f37c46428e4a12b.jpg",
  //           type: "Emblem",
  //           itemType: 14,
  //           perks: []
  //         }
  //       ],
  //       "16": [
  //         {
  //           name: "Sunbreaker",
  //           icon:
  //             "/common/destiny2_content/icons/ce681395733e3b2cfe86d538e74416b5.png",
  //           type: "Titan Subclass",
  //           itemType: 16,
  //           perks: [
  //             {
  //               name: "Pulse Grenade",
  //               icon:
  //                 "/common/destiny2_content/icons/3b515e2617bffe787c0246452153c105.png"
  //             },
  //             {
  //               name: "Landfall",
  //               icon:
  //                 "/common/destiny2_content/icons/41652a0e135077dba6b888d1678bc003.png"
  //             },
  //             {
  //               name: "Hammer of Sol",
  //               icon:
  //                 "/common/destiny2_content/icons/6204de291b057eccb6624673d60ba62f.png"
  //             },
  //             {
  //               name: "Tempered Metal",
  //               icon:
  //                 "/common/destiny2_content/icons/7ee431da6baee9849599ba56e79c15b4.png"
  //             },
  //             {
  //               name: "Vulcan's Rage",
  //               icon:
  //                 "/common/destiny2_content/icons/2285a7629ed8e1ff2b434a0253d70fb8.png"
  //             }
  //           ]
  //         }
  //       ],
  //       "17": [
  //         {
  //           name: "Clan Banner",
  //           icon:
  //             "/common/destiny2_content/icons/dae1683dc61a7cf657963c68d47316d8.jpg",
  //           type: "Clan Banner",
  //           itemType: 17,
  //           perks: []
  //         }
  //       ],
  //       "21": [
  //         {
  //           name: "A Thousand Wings",
  //           icon:
  //             "/common/destiny2_content/icons/3139365d986ccaaf4e3cea8845d8df72.jpg",
  //           type: "Ship",
  //           itemType: 21,
  //           perks: [
  //             {
  //               name: "The Past Unearthed",
  //               icon:
  //                 "/common/destiny2_content/icons/82ea9eb37bfcccb80a3a9693a2f5bb1c.png"
  //             }
  //           ]
  //         }
  //       ],
  //       "22": [
  //         {
  //           name: "Tilt Fuse",
  //           icon:
  //             "/common/destiny2_content/icons/a2dd642b18b15f764db069f845f5173c.jpg",
  //           type: "Vehicle",
  //           itemType: 22,
  //           perks: [
  //             {
  //               name: "Faster Summon",
  //               icon:
  //                 "/common/destiny2_content/icons/c1b7d9c21f3d2636679c4d3beb9a0ed4.png"
  //             }
  //           ],
  //           level: 160
  //         }
  //       ],
  //       "24": [
  //         {
  //           name: "The Lycan's Mire Shell",
  //           icon:
  //             "/common/destiny2_content/icons/4cb2ce6acf1bf640e8992ef87ff4caba.jpg",
  //           type: "Ghost Shell",
  //           itemType: 24,
  //           perks: []
  //         }
  //       ]
  //     }
  //   },
  //   {
  //     characterId: "2305843009345106061",
  //     minutesPlayedTotal: "16090",
  //     light: 644,
  //     race: "Awoken",
  //     gender: "Female",
  //     class: "Hunter",
  //     emblem:
  //       "/common/destiny2_content/icons/ff2155598f2b5984aba551b5198c4175.jpg",
  //     items: {
  //       "2": [
  //         {
  //           name: "Reverie Dawn Casque",
  //           icon:
  //             "/common/destiny2_content/icons/d44ef5fc35be1fc9b6f2279779e3994d.jpg",
  //           type: "Helmet",
  //           itemType: 2,
  //           perks: [
  //             {
  //               name: "Survivalist Hunter Armor",
  //               icon:
  //                 "/common/destiny2_content/icons/e322b89f798774db252d0b01dc6afdd1.png"
  //             },
  //             {
  //               name: "Void Damage Resistance",
  //               icon:
  //                 "/common/destiny2_content/icons/6df20344470cd7b11c6ffbd104c5a361.png"
  //             },
  //             {
  //               name: "Hands-On",
  //               icon:
  //                 "/common/destiny2_content/icons/464ed42a0cb0e5ece5c4a39ef8d88e17.png"
  //             },
  //             {
  //               name: "Heavy Ammo Finder",
  //               icon:
  //                 "/common/destiny2_content/icons/4f900a2b6e2b8d14e96e7e8afded72db.png"
  //             }
  //           ],
  //           level: 650
  //         },
  //         {
  //           name: "Grips of the Great Hunt",
  //           icon:
  //             "/common/destiny2_content/icons/b9b6d1130c9e9fe72a3892777bacbdf5.jpg",
  //           type: "Gauntlets",
  //           itemType: 2,
  //           perks: [
  //             {
  //               name: "Survivalist Hunter Armor",
  //               icon:
  //                 "/common/destiny2_content/icons/e322b89f798774db252d0b01dc6afdd1.png"
  //             },
  //             {
  //               name: "Void Damage Resistance",
  //               icon:
  //                 "/common/destiny2_content/icons/6df20344470cd7b11c6ffbd104c5a361.png"
  //             },
  //             {
  //               name: "Momentum Transfer",
  //               icon:
  //                 "/common/destiny2_content/icons/1931dc22d9bbde91e65b1f40dba8fa8a.png"
  //             },
  //             {
  //               name: "Grenade Launcher Scavenger",
  //               icon:
  //                 "/common/destiny2_content/icons/534855325240e2c79d2b72a6235f5559.png"
  //             }
  //           ],
  //           level: 650
  //         },
  //         {
  //           name: "Reverie Dawn Hauberk",
  //           icon:
  //             "/common/destiny2_content/icons/8e61a7c9f7aea6fb5153c1ae3a979232.jpg",
  //           type: "Chest Armor",
  //           itemType: 2,
  //           perks: [
  //             {
  //               name: "Survivalist Hunter Armor",
  //               icon:
  //                 "/common/destiny2_content/icons/e322b89f798774db252d0b01dc6afdd1.png"
  //             },
  //             {
  //               name: "Arc Damage Resistance",
  //               icon:
  //                 "/common/destiny2_content/icons/aea5816da503edaa9d76e5ae7fc61fd3.png"
  //             },
  //             {
  //               name: "Unflinching Grenade Launcher Aim",
  //               icon:
  //                 "/common/destiny2_content/icons/30b1083fa1c60a12204a850a8bd5e94d.png"
  //             },
  //             {
  //               name: "Hand Cannon Reserves",
  //               icon:
  //                 "/common/destiny2_content/icons/d6602930fbf40551612debc7d38fe6d3.png"
  //             }
  //           ],
  //           level: 650
  //         },
  //         {
  //           name: "Bladesmith's Memory Strides",
  //           icon:
  //             "/common/destiny2_content/icons/457eb45f301a33cd88a62c76c38eb8e6.jpg",
  //           type: "Leg Armor",
  //           itemType: 2,
  //           perks: [
  //             {
  //               name: "Heavy Hunter Armor",
  //               icon:
  //                 "/common/destiny2_content/icons/e52628a709fe1fe96c5da73d5f7e957e.png"
  //             },
  //             {
  //               name: "Void Damage Resistance",
  //               icon:
  //                 "/common/destiny2_content/icons/6df20344470cd7b11c6ffbd104c5a361.png"
  //             },
  //             {
  //               name: "Scout Rifle Dexterity",
  //               icon:
  //                 "/common/destiny2_content/icons/5b58a6ec60ba3ce86d9152c15ff731d9.png"
  //             },
  //             {
  //               name: "Auto Rifle Scavenger",
  //               icon:
  //                 "/common/destiny2_content/icons/98277564267705162c0eac005b9d514e.png"
  //             }
  //           ],
  //           level: 650
  //         },
  //         {
  //           name: "Cloak of the Great Hunt",
  //           icon:
  //             "/common/destiny2_content/icons/bbd4b87914cf175225601344d9ff96db.jpg",
  //           type: "Hunter Cloak",
  //           itemType: 2,
  //           perks: [
  //             {
  //               name: "Solar Damage Resistance",
  //               icon:
  //                 "/common/destiny2_content/icons/b7f54ca7aa43b292f0ff3f966b373214.png"
  //             },
  //             {
  //               name: "Invigoration",
  //               icon:
  //                 "/common/destiny2_content/icons/ab173f1be9bc21155ff6b84e6710eec2.png"
  //             },
  //             {
  //               name: "Sword Reserves",
  //               icon:
  //                 "/common/destiny2_content/icons/ee0de9f0b1a441dc328b8ab664a67b8b.png"
  //             }
  //           ],
  //           level: 650
  //         }
  //       ],
  //       "3": [
  //         {
  //           name: "Go Figure",
  //           icon:
  //             "/common/destiny2_content/icons/a56e7f0cb7692696f693ab10dd556507.jpg",
  //           type: "Pulse Rifle",
  //           itemType: 3,
  //           perks: [
  //             {
  //               name: "Aggressive Burst",
  //               icon:
  //                 "/common/destiny2_content/icons/0a18b7264e9fb76764756a25d0a20fd2.png"
  //             },
  //             {
  //               name: "Outlaw",
  //               icon:
  //                 "/common/destiny2_content/icons/22f478a5c757c128b7c367ddc42180ab.png"
  //             },
  //             {
  //               name: "Rampage",
  //               icon:
  //                 "/common/destiny2_content/icons/e9aa2f479812bfabc8d48effde384737.png"
  //             }
  //           ],
  //           level: 650
  //         },
  //         {
  //           name: "IKELOS_SG_v1.0.1",
  //           icon:
  //             "/common/destiny2_content/icons/edfdd807c9d604e80b48ad8fe39c8f36.jpg",
  //           type: "Shotgun",
  //           itemType: 3,
  //           perks: [
  //             {
  //               name: "Rapid-Fire Frame",
  //               icon:
  //                 "/common/destiny2_content/icons/0ab090e93e19da9e841b0f94c5ab7de6.png"
  //             },
  //             {
  //               name: "Trench Barrel",
  //               icon:
  //                 "/common/destiny2_content/icons/09ecf09e4cc4b0e087d8711d817c64b6.png"
  //             },
  //             {
  //               name: "Threat Detector",
  //               icon:
  //                 "/common/destiny2_content/icons/1cc8d4604d29dfe5bdc321b4c2681bfb.png"
  //             }
  //           ],
  //           level: 650
  //         },
  //         {
  //           name: "Avalanche",
  //           icon:
  //             "/common/destiny2_content/icons/eae82bc2469959602ba2f028ba2b3210.jpg",
  //           type: "Machine Gun",
  //           itemType: 3,
  //           perks: [
  //             {
  //               name: "Adaptive Frame",
  //               icon:
  //                 "/common/destiny2_content/icons/ad56b0e83d31592d9984cdf2f392452a.png"
  //             },
  //             {
  //               name: "Threat Detector",
  //               icon:
  //                 "/common/destiny2_content/icons/1cc8d4604d29dfe5bdc321b4c2681bfb.png"
  //             },
  //             {
  //               name: "Rampage",
  //               icon:
  //                 "/common/destiny2_content/icons/e9aa2f479812bfabc8d48effde384737.png"
  //             }
  //           ],
  //           level: 609
  //         }
  //       ],
  //       "14": [
  //         {
  //           name: "Wish No More",
  //           icon:
  //             "/common/destiny2_content/icons/ecc3e805988dd9947f37c46428e4a12b.jpg",
  //           type: "Emblem",
  //           itemType: 14,
  //           perks: []
  //         }
  //       ],
  //       "16": [
  //         {
  //           name: "Gunslinger",
  //           icon:
  //             "/common/destiny2_content/icons/ce681395733e3b2cfe86d538e74416b5.png",
  //           type: "Hunter Subclass",
  //           itemType: 16,
  //           perks: [
  //             {
  //               name: "Gambler's Dodge",
  //               icon:
  //                 "/common/destiny2_content/icons/9e1b021e72010a35cda4d824b0eb79b0.png"
  //             },
  //             {
  //               name: "Pulse Grenade",
  //               icon:
  //                 "/common/destiny2_content/icons/3b515e2617bffe787c0246452153c105.png"
  //             },
  //             {
  //               name: "Landfall",
  //               icon:
  //                 "/common/destiny2_content/icons/41652a0e135077dba6b888d1678bc003.png"
  //             },
  //             {
  //               name: "Golden Gun",
  //               icon:
  //                 "/common/destiny2_content/icons/a841279eee9770b4b97b1801038dfacd.png"
  //             },
  //             {
  //               name: "Knife-Juggler",
  //               icon:
  //                 "/common/destiny2_content/icons/98d60148a16f44d8f59b590717d43271.png"
  //             },
  //             {
  //               name: "Line 'Em Up",
  //               icon:
  //                 "/common/destiny2_content/icons/42d1e25dfa05c1e122725993dabf2056.png"
  //             }
  //           ]
  //         }
  //       ],
  //       "17": [
  //         {
  //           name: "Clan Banner",
  //           icon:
  //             "/common/destiny2_content/icons/dae1683dc61a7cf657963c68d47316d8.jpg",
  //           type: "Clan Banner",
  //           itemType: 17,
  //           perks: []
  //         }
  //       ],
  //       "21": [
  //         {
  //           name: "A Thousand Wings",
  //           icon:
  //             "/common/destiny2_content/icons/3139365d986ccaaf4e3cea8845d8df72.jpg",
  //           type: "Ship",
  //           itemType: 21,
  //           perks: [
  //             {
  //               name: "Taken Arrival",
  //               icon:
  //                 "/common/destiny2_content/icons/46fa0c2bb8ccc7c30a8913c9e33ac501.png"
  //             }
  //           ]
  //         }
  //       ],
  //       "22": [
  //         {
  //           name: "Harbinger's Echo",
  //           icon:
  //             "/common/destiny2_content/icons/610b356a24e67e69f57735263bf9c03c.jpg",
  //           type: "Vehicle",
  //           itemType: 22,
  //           perks: [
  //             {
  //               name: "Destabilizers",
  //               icon:
  //                 "/common/destiny2_content/icons/e413865a030e3622e204e951f210dd9f.png"
  //             },
  //             {
  //               name: "Faster Summon",
  //               icon:
  //                 "/common/destiny2_content/icons/c1b7d9c21f3d2636679c4d3beb9a0ed4.png"
  //             }
  //           ],
  //           level: 160
  //         }
  //       ],
  //       "24": [
  //         {
  //           name: "Knight's Peace Shell",
  //           icon:
  //             "/common/destiny2_content/icons/3073e06aef67afd389d669e532f1f1f8.jpg",
  //           type: "Ghost Shell",
  //           itemType: 24,
  //           perks: [
  //             {
  //               name: "Guiding Light",
  //               icon:
  //                 "/common/destiny2_content/icons/b2b78d5e55a083fab5c42e5e18a194f1.png"
  //             },
  //             {
  //               name: "Omni-Telemetry",
  //               icon:
  //                 "/common/destiny2_content/icons/6497c7accb94dbd951c2be4d314dcff7.png"
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   }
  // ];

  // res.end(JSON.stringify({ success: true, data: staticData }));
};
